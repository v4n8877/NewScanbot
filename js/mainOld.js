$(document).ready(function () {
  // LOADING BLOCK UI
  var defaultWidth = 1920
  var defaultHeight = 1440
  var searchParams = new URLSearchParams(window.location.search);
  var chooseFile = searchParams.get("choose-file");
  var videoSelect = document.querySelector('select#listCamera');
  videoSelect.onchange = getStream;
  var questions = [];
  var examCode= '';

  // var makingUrl = "https://dev-edu-auto-marking.bappartners.com/marking";
  // var scoringUrl = "https://stg-edu-gakutore-api.bappartners.com/scoring";
  // var gakutoreUrl = "https://stg-edu-gakutore-web.bappartners.com";

  var makingUrl = "CI_API_URL";
  var scoringUrl = "CI_API_SCORING";
  var gakutoreUrl = "CI_GAKUTORE_URL";

  if (chooseFile === "true") {
    $(".choose-file-col").show();
  } else {
    $(".choose-file-col").hide();
  }

  // NOTIFICATION FUNCTION
  function notify(type,message){
    (()=>{
      let n = document.createElement("div");
      let id = Math.random().toString(36).substr(2,10);
      n.setAttribute("id",id);
      n.classList.add("notification",type);
      n.innerText = message;
      document.getElementById("notification-area").appendChild(n);
      setTimeout(()=>{
        var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
        for(let i=0;i<notifications.length;i++){
          if(notifications[i].getAttribute("id") == id){
            notifications[i].remove();
            break;
          }
        }
      },5000);
    })();
  }
  
  function notifySuccess(message){
    notify("success", message);
  }
  function notifyError(message){
    notify("error", message);
  }
  function notifyInfo(message){
    notify("info", message);
  }

  $(document).on("ajaxSend", function (e, xhr, settings) {
    $.blockUI({
      message: `<img src="/image/loading.gif" width="50px" height="50px" />`,
      css: {
        backgroundColor: 'transparent',
        border: 'none'
      }
    });
  }).on("ajaxComplete", function (e, jqXHR, settings) {
    $.unblockUI();
  }).on("ajaxStop", function () {
    $.unblockUI();
  }).on("ajaxError", function (e, jqXHR, settings) {
    if (jqXHR && jqXHR.responseJSON) {
      console.log(jqXHR.responseJSON.message);
    }
    $.unblockUI();
  });
  // END LOADING BLOCK UI

  // TAKE SNAPSHOT


  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');


  function throwError(e) {
    alert(e.name);
  }

  async function sendApiMarking(dataURL) {
    $("body").addClass("loading");
    const formData = new FormData();
    formData.append('files', dataURL);

    let respone = await fetch(`${makingUrl}`, {
      method: 'POST',
      body: formData,
    });
    let content = await respone.json();
    if (content.message !== "SUCCESSFUL") {
      const splitString = content.message.split("_").join(" ");
      notifyError(splitString);
      $("body").removeClass("loading");
      return
    }
    $("body").removeClass("loading");
    $("#take-snap").hide();
    $("#result-convert").show({
      done: () => {
        const getElement = $('.box_image');
        if (!Array.isArray(Object.values(content.score))) {
          return
        }
        Object.values(content.score).forEach((score) => {
          questions.push({
            index: score.name,
            correct: score.right_answers,
            total: score.total
          });
          examCode = content.exam_code;
          $(".result-convert-score").append(`
                <div class="input__group d-flex justify-content-between">
                  <span class="score-name">大問 ${score.name} </span>
                  <div class="input__result">
                    <input type="text" value="${score.right_answers}"> / <text>${score.total}</text>
                  </div>
                </div>
              `)
        });
        $(".result-convert-score").append(`
              <div class="text-center editable">
                **編集可能
              </div>
            `)
        if(content?.detect_images_url.length > 0) {
          for(const index = 0; index < content?.detect_images_url.length; index ++) {
            const img = document.createElement("img");
            img.src= content?.detect_images_url[index];
            return getElement[0].appendChild(img);
          }
        }
      }
    });
  };

  $("#submit").click(async function() {
    let respone = await fetch(`${scoringUrl}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        "examCode": examCode,
        "questions": questions
      })
    });
    let result = await respone.json();
    if (result.status !== 200) {
      const splitString = result.message.split("_").join(" ");
      notifyError(splitString);
      return
    }
    window.open(`${gakutoreUrl}/scoring?userId=${result.data.userId}`);
  })

  function getDevices() {
    return navigator.mediaDevices.enumerateDevices();
  }

  function gotDevices(deviceInfos) {
    window.deviceInfos = deviceInfos;
    for (const deviceInfo of deviceInfos) {
      const option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'videoinput') {
        option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
        videoSelect.appendChild(option);
      }
    }
  }

  function getStream() {
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
    const videoSource = videoSelect.value;
    const constraints = {
      video: {
        deviceId: videoSource ? { exact: videoSource } : undefined,
        width: { ideal: 2560 },
        height: { ideal: 1920 },
        video: true,
      }
    };

    return navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).catch(throwError);
  }

  function gotStream(stream) {
    window.stream = stream;
    videoSelect.selectedIndex = [...videoSelect.options].
      findIndex(option => option.text === stream.getVideoTracks()[0].label);
    video.srcObject = stream;
    const track = stream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
    video.play();
  }


  $('.start-snap-btn').click(function (event) {
    $('#start-snap').hide();
    $('#take-snap').show();
    getStream().then(getDevices).then(gotDevices);
  });

  $('#snap').click(function (event) {
    imageCapture.takePhoto()
    .then(blob => createImageBitmap(blob, { resizeWidth: 2560, resizeHeight: 1920, resizeQuality: "high"}))
    .then(imageBitmap => {
      const canvas = document.querySelector('#canvas');
      drawCanvas(canvas, imageBitmap);
    })
    .catch(error => console.log(error));
  });

  /* Utils */
 async function drawCanvas(canvas, img) {
    let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, x, y, img.width, img.height);
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    var myCanvas = $("#canvas");
    var dataURL = await myCanvas.get(0).toDataURL();
    myCanvas.get(0).toBlob(sendApiMarking);
    const image = $(".convert_img");
    image.attr("src", dataURL);
    $('#video').hide();
    $('.convert_img').show();
    // arrayImages.push(dataURL);
    // previewImages(arrayImages);
  }

  // PREVIEW
  // function previewImages(images) {
  //   const getId = $('#vid');
  //   if(images.length > 0) {
  //     for(const index = 0; index < images.length; index ++) {
  //       const img = document.createElement("img");
  //       img.src= images[index];
  //       img.classList.add('convert_img');
  //       return getId[0].appendChild(img);
  //     }
  //     $('#video').hide();
  //     $('.convert_img').show();
  //   }
  // }
  // END TAKE SNAPSHOT

  $('#choose-file').change(function (event) {
    const [file] = event.target.files
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataURL = e.target.result
      sendApiMarking(dataURL);
    }
    reader.readAsDataURL(file)
  });

  // EVENT RESULT CONVERT
  $(".test-again-btn").click(function (event) {
    $("#take-snap").show();
    $("#result-convert").hide();
    $(".result-convert-score").html('');
    $("#result-convert-image").attr("src", "");
    $('#video').show();
    $('.convert_img').hide();
    questions = [];
    examCode= '';
  });
  // END EVENT RESULT CONVERT

});
