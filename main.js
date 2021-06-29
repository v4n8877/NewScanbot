var results = [], currentIndex;
var scanbotSDK, documentScanner, croppingView;
var cheatTimer = null;


$(document).ready(async function () {
  //DEFINE ENVS
  var makingUrl = "https://stg-edu-auto-marking.bappartners.com/marking";
  var scoringUrl = "https://stg-edu-gakutore-api.bappartners.com/scoring";
  var gakutoreUrl = "https://stg-edu-gakutore-web.bappartners.com";

  // var makingUrl = "CI_API_URL";
  // var scoringUrl = "CI_API_SCORING";
  // var gakutoreUrl = "CI_GAKUTORE_URL";
  const getVariable = localStorage.getItem('REMOVE_FLAG');
  var removeBg = getVariable ? getVariable : 'True';

  if(removeBg === "True") {
    scanbotSDK = await ScanbotSDK.initialize({ licenseKey: Config.license() });
    cheatTimer = setInterval(async () => {
      scanbotSDK = await ScanbotSDK.initialize({ licenseKey: Config.license() });
    }, 60000);
    $("#video").addClass("hidden__content");
    $("#scanbot-camera-container").removeClass("hidden__content");
  } else {
    $("#video").removeClass("hidden__content");
    $("#scanbot-camera-container").addClass("hidden__content");
  }

  var videoSelect = document.querySelector('select#listCamera');
  var video = document.getElementById('video');
  var arrayImages = [];
  var questions = [];
  var examCode= '';
  var totalAnswer = 0;
  var totalQuestion = 0
  var context = canvas.getContext('2d');
  $("#submit__files").attr('disabled', 'disabled');
  var listDevices = [];
  let zoom = 1;

  $("#turn__scanbot").on('click', function(e) {
    e.preventDefault();
    if(removeBg === "True") {
      localStorage.setItem('REMOVE_FLAG', 'False');
    } else {
      localStorage.setItem('REMOVE_FLAG', 'True');
    }
    location.reload();
  })

   // NOTIFICATION FUNCTION
   function notify(type,message) {
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

  //Toggle help
  $("#help").click(function(event) {
    const getElement = $(event.currentTarget).find('.header__help--explain');
    const checkStt = getElement.attr("class")
    const getImg = $(event.currentTarget).find('.header__help--icon').children('img');
    if(!checkStt.includes("hidden__content")) {
      getElement.addClass("hidden__content");
      getImg.attr('src', "./asset/images/HelpHide.svg");
    } else {
      getElement.removeClass("hidden__content");
      getImg.attr('src', "./asset/images/Help.svg");
    }
  });

  //Toggle info
  $("#info").click(function(event) {
    const getElement = $(event.currentTarget).find('.header__help--explain');
    const checkStt = getElement.attr("class")
    if(!checkStt.includes("hidden__content")) {
      getElement.addClass("hidden__content");
    } else {
      getElement.removeClass("hidden__content");
    }
  })

  // Accept camera
  if (removeBg === "True") {
    $(document).on('load', getDevices().then(gotDevices));
  } else {
    $(document).on('load', getStream().then(getDevices).then(gotDevices));
  }

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
        listDevices.push({deviceInfo});
        // videoSelect.appendChild(option);
        $(".dropdown__list").append(`
          <li class="dropdown__item">
            <span class="dropdown__text" data-value=${deviceInfo.deviceId}>${deviceInfo.label || `Camera ${videoSelect.length + 1}`}</span>
          </li>
        `)
      }
    }
  };

  function getStream(videoSource) {
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
    // const videoSource = videoSelect.value;
    const constraints = {
      video: {
        deviceId: videoSource ? { exact: videoSource } : undefined,
        width: { ideal: 2560 },
        height: { ideal: 1920 },
        video: true,
      }
    };

    return navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).catch(err => console.log('err', err));
  }

  function gotStream(stream) {
    window.stream = stream;
    $(".dropdown__selected").text(`${stream.getVideoTracks()[0].label}`);
    video.srcObject = stream;
    const track = stream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
    video.play();
  }

  const dropdownSelect = document.querySelector(
    "#lightdropdown .dropdown__select"
  );
  const dropdownSelectText = document.querySelector(
    "#lightdropdown .dropdown__selected"
  );
  const dropdownList = document.querySelector(
    "#lightdropdown .dropdown__list"
  );

  dropdownSelect.addEventListener("click", function () {
    dropdownList.classList.toggle("show");
  });

  function handleSelectDropdown(e) {
    const { value } = e.target.dataset;
    const { innerText } = e.target;
    dropdownSelectText.textContent = innerText;
    getStream(value)
    dropdownList.classList.remove("show");
  }

  if(removeBg === "True") {
    $('.dropdown__select').on('click', () => {
      $('.dropdown__list').toggleClass('show');
    });
  } else {
    $("#lightdropdown .dropdown__list").delegate('li', 'click', function (e) {
      handleSelectDropdown(e)
    });
  }

  if(removeBg === "True") {
    const config = {
      containerId: Config.scannerContainerId(),
      acceptedAngleScore: 60,
      acceptedSizeScore: 60,
      autoCaptureSensitivity: 0.66,
      autoCaptureEnabled: true,
      ignoreBadAspectRatio: false,
      onDocumentDetected: onDocumentDetected,
      onError: onScannerError
    };
    documentScanner = await scanbotSDK.createDocumentScanner(config);
    documentScanner.enableAutoCapture();
  }

  // TAKE PHOTO
  $('#snap').click(function (event) {
    event.preventDefault();
    if(arrayImages.length > 2) {
      return;
    }
    $(".btn__play").attr('disabled', 'disabled');
    if(removeBg === "True") {
      documentScanner.enableAutoCapture();
    } else {
      $(".section__img").addClass("hidden__content");
      $("#myCanvas").removeClass("hidden__content");
      $('#content__img').removeAttr('style');
      $("#content__img").attr("src", '');
      $("#video").addClass("hidden__content");
      $("#content__img--loading").removeClass("hidden__content");
      $(".overlay__loading").removeClass("hidden__content");
      $('#snap').attr('disabled', 'disabled');
      $(".btn__play").attr('disabled', 'disabled');
      imageCapture.takePhoto()
      .then(blob => createImageBitmap(blob))
      .then(imageBitmap => {
        const canvas = document.querySelector('#canvas');
        drawCanvas(canvas, imageBitmap);
      })
      .catch(error => console.log(error));
      }
  });

  async function onDocumentDetected(e) {
    documentScanner.disableAutoCapture();
    try {
      results.push(e);
      const { cropped, original } = e;
      let blob;
      if(removeBg === "True") {
        blob = new Blob([cropped], {type: `image/png`});
      } else {
        blob = new Blob([original], {type: `image/png`});
      }
      const imageBitmap = await createImageBitmap(blob);
      const canvas = document.querySelector('#canvas');
      await drawCanvas(canvas, imageBitmap);

    } catch (err) {
      notifyError(err);
      $(".overlay__loading").addClass("hidden__content");
      $('#snap').attr('disabled', false);
    }
  }

  async function onScannerError(e) {
      console.log("Error:", e);
  }

  //DRAW IMAGE ON SLIDER
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
    const dataURL = await myCanvas.get(0).toDataURL('image/jpeg', 1.0);
    myCanvas.get(0).toBlob(pushToArray);
    previewImages(dataURL);
  }

  async function pushToArray(dataURL) {
    arrayImages.push(dataURL);
    if (arrayImages.length > 2) {
      $('#snap').attr('disabled', true);
      return;
    }
  }

  // PREVIEW SLIDER
  function previewImages(item) {
    const contentSlider = $('.slider__carousel');
    const findChild = contentSlider.children("");
    $('#submit__files').removeAttr('disabled');
    $(".overlay__loading").addClass("hidden__content");
    $("#content__img--loading").addClass("hidden__content");
    $("#scanbot-camera-container").removeClass("hidden__content");
    $('#snap').removeAttr('disabled');
    $(".btn__play").removeAttr('disabled');
    if(findChild.length > 0) {
      return contentSlider.append(`
        <div class="slider__item carousel-item">
          <img class="slider__item--img" src=${item} alt='item'index="${results.length - 1}" />
          <button class="btn btn-danger slider__item--btn" id="btn-delete">
            <img src="./asset/images/TrashSimple.svg" alt="camera" />
          </button> 
        </div>
      `)
    }
    return contentSlider.append(`
      <div class="slider__item carousel-item active">
        <img class="slider__item--img" src=${item} alt='item' index="${results.length - 1}" />
        <button class="btn btn-danger slider__item--btn" id="btn-delete">
          <img src="./asset/images/TrashSimple.svg" alt="camera" />
        </button> 
      </div>
    `)
  }

  // PREVIEW AFTER TAKE PHOTOS
  $(".slider__carousel").delegate('.slider__item--img', 'click', function (e) {
    e.preventDefault();
    if(removeBg === "True") {
      documentScanner.dispose();
    }
    $("#video").addClass("hidden__content");
    $("#scanbot-camera-container").addClass("hidden__content");
    const { src } = e.target;
    $(".section__img").removeClass("hidden__content");
    $(".close").removeClass("hidden__content");
    $("#myCanvas").addClass("hidden__content");
    $("#content__img").attr("src", src).css({height: "calc(9vh + 606px)"});
  });

  $(".close").on('click', async function (e) {
    e.preventDefault();
    if(removeBg === "True") {
      $("#video").addClass("hidden__content");
      $("#scanbot-camera-container").removeClass("hidden__content");
    } else {
      $("#video").removeClass("hidden__content");
      $("#scanbot-camera-container").addClass("hidden__content");
    }
    $(".section__img").addClass("hidden__content");
    $("#myCanvas").removeClass("hidden__content");
    $('#content__img').removeAttr('style');
    $("#content__img").attr("src", '');
    if(removeBg === "True") {
      documentScanner = await scanbotSDK.createDocumentScanner(config);
    }
    if (arrayImages.length < 3) {
      $('#snap').attr('disabled', false);
    }
  })

  // DELETE PHOTOS
  $('.slider__carousel').on("mouseenter", ".slider__item", async function(e) {
    e.preventDefault();
    const getIndex = await $(this).index();
    if(arrayImages.length > 0) {
      $(this).find(".slider__item--btn").click(function(event) {
        event.preventDefault();
        if(arrayImages.length >= 1) {
          if(getIndex === 0) {
            $(".slider__item:eq(1)").addClass("active");
            $(".slider__item:eq(0)").remove();
          } else {
            $(`.slider__item:eq(${getIndex})`).remove();
          }
        }
       $('#snap').attr('disabled', false);
       return arrayImages.splice(getIndex, 1);
      });
    }
  });

  // ZOOM IN_OUT
  $('.zoom__in').on('click', function() {
    zoom += 0.1;
    $("#content__img").css('zoom', zoom);
  });

  $('.zoom__out').on('click', function() {
    zoom -= 0.1;
    $("#content__img").css('zoom', zoom);
  });

  // SEND TO SERVER
  $("#submit__files").click((e) => {
    e.preventDefault();
    if(removeBg === "True") {
      documentScanner.dispose();
    }
    $("#video").addClass("hidden__content");
    $("#scanbot-camera-container").addClass("hidden__content");
    const getSrc =  $(`.slider__item:eq(${0})`).find('img').attr('src');
    $(".section__img").removeClass("hidden__content");
    $(".close").addClass("hidden__content");
    $("#content__img").attr("src", getSrc);
    $("#myCanvas").addClass("hidden__content");
    $("#content__img").removeClass("hidden__content").attr("src", getSrc);
    sendApiMarking();
  })

  async function sendApiMarking() {
    $(".overlay").removeClass("hidden__content");
    $(".btn__play").addClass("hidden__content");
    $(".btn__pause").removeClass("hidden__content");
    $('#snap').attr('disabled', 'disabled');
    $(".btn__pause").attr('disabled', 'disabled')
    $('#content__img').removeAttr('style');
    const formData = new FormData();
    formData.append("removedBackground", removeBg);
    for(let i = 0; i < arrayImages.length; i++) {
      formData.append(`files_${i}`, arrayImages[i]);
    }
    let respone = await fetch(`${makingUrl}`, {
      method: 'POST',
      body: formData,
    });

    let content = await respone.json();
    $(".overlay").addClass("hidden__content");
    if (content.message !== "SUCCESSFUL") {
      const splitString = content.message.split("_").join(" ");
      notifyError(splitString);
      setDefault();
      return;
    } else {
      $(".left__footer").addClass("hidden__content");
      $("#snap").addClass("hidden__content");
      $(".right__table").removeClass("hidden__content");
      $(".right__btn-grp").removeClass("hidden__content");
      $(".left__header").addClass("hidden__content");
      $("#scanbot-camera-container").addClass("hidden__content");
      $(".btn__play").addClass("hidden__content");
      $(".btn__pause").addClass("hidden__content");
      $(".slider__arrow").removeClass("hidden__content")
      $("#content__img--loading").addClass("hidden__content");
      $(".left__content").addClass("left__content--active")
      $("#content__img").removeClass("hidden__content").attr("src", content.detect_images_url[0]);
      $(".slider__item").remove();
      arrayImages = [];
      const contentSlider = $('.slider__carousel');
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
        totalAnswer += score.right_answers;
        totalQuestion += score.total
        $(".table__content")
          .append(`
            <div class="table__item">
              <span class="table__item--label">大問${score.name}</span>
              <div class="table__item--number">
                <span class="table__header--title">${score.right_answers}</span>
                <span class="table__header--title">/</span>
                <span class="table__header--title">${score.total}</span>
              </div>
            </div>
          `)
      });

      $(".table__header").append(`
        <div class="table__header--total">
          <span class="table__header--title">${totalAnswer}</span>
          <span class="table__header--title">/</span>
          <span class="table__header--title">${totalQuestion}</span>
        </div>
      `)

      content.detect_images_url.forEach((link, index) => {
        if(index === 0) {
          contentSlider.append(`
          <div class="slider__item carousel-item slider__item--img-unactive slider__item--img-active active ">
            <img class="slider__item--img" src=${link} alt='item' />
          </div>
        `)
        } else {
          contentSlider.append(`
            <div class="slider__item carousel-item slider__item--img-unactive">
              <img class="slider__item--img" src=${link} alt='item' />
            </div>
          `)
        }
      });
    }
  }

  //PREVIEW WITH SELECT IMAGE
  $("#next-arrow").on('click', function() {
    const getParent = $(".slider__carousel").find('.slider__item');
    if(getParent.length > 0) {
      let getElement = $(".slider__carousel").find('.slider__item--img-active');
      let getIndex = getElement.index();
      if(getIndex < getParent.length - 1) {
        $(`.slider__item:eq(${getIndex})`).removeClass('slider__item--img-active');
        $(`.slider__item:eq(${getIndex + 1})`).addClass('slider__item--img-active');
        const getSrc =  $(`.slider__item:eq(${getIndex + 1})`).find('img').attr('src');
        $("#content__img").removeClass("hidden__content").attr("src", getSrc);
      } else {
        $(`.slider__item:eq(${getIndex})`).removeClass('slider__item--img-active');
        $(`.slider__item:eq(0)`).addClass('slider__item--img-active');
        const getSrc =  $(`.slider__item:eq(${0})`).find('img').attr('src');
        $("#content__img").removeClass("hidden__content").attr("src", getSrc);
      }
    }
    
  })

  $("#prev-arrow").on('click', function() {
    const getParent = $(".slider__carousel").find('.slider__item');
    if(getParent.length > 0) {
      let getElement = $(".slider__carousel").find('.slider__item--img-active');
      let getIndex = getElement.index();
      if(getIndex === 0) {
        $(`.slider__item:eq(${getIndex})`).removeClass('slider__item--img-active');
        $(`.slider__item:eq(${getParent.length - 1})`).addClass('slider__item--img-active');
        const getSrc =  $(`.slider__item:eq(${getParent.length - 1})`).find('img').attr('src');
        $("#content__img").removeClass("hidden__content").attr("src", getSrc);
      } else {
        $(`.slider__item:eq(${getIndex})`).removeClass('slider__item--img-active');
        $(`.slider__item:eq(${getIndex - 1})`).addClass('slider__item--img-active');
        const getSrc =  $(`.slider__item:eq(${getIndex - 1})`).find('img').attr('src');
        $("#content__img").removeClass("hidden__content").attr("src", getSrc);
      }
    }
  })

  // SENDING SCORING
  $("#submit__scoring").click(async function() {
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
    window.open(`${gakutoreUrl}?userId=${result.data.userId}&examId=${examCode}`);
  })

  // EVENT RESULT CONVERT
  $("#submit__rescan").click(function (event) {
    event.preventDefault();
    setDefault();
  });

 async function setDefault() {
    arrayImages = [];
    questions = [];
    examCode= '';
    totalAnswer = 0;
    totalQuestion = 0
    $(".slider__item").remove();
    $(".table__item").remove();
    $(".table__header--total").remove();
    $(".left__footer").removeClass("hidden__content");
    $("#snap").removeClass("hidden__content");
    $('#snap').removeAttr('disabled');
    $(".left__content").removeClass("left__content--active")
    $(".right__table").addClass("hidden__content");
    $(".right__btn-grp").addClass("hidden__content");
    $(".left__header").removeClass("hidden__content");
    $(".btn__pause").addClass("hidden__content");
    $(".btn__play").removeClass("hidden__content");
    $("#scanbot-camera-container").removeClass("hidden__content");
    $(".slider__arrow").addClass("hidden__content")
    $("#myCanvas").removeClass("hidden__content");
    $(".section__img").addClass("hidden__content");
    $("#content__img").attr("src", "");
    if(removeBg === "True") {
      documentScanner = await scanbotSDK.createDocumentScanner(config);
      documentScanner.enableAutoCapture();
    }
  }
});