import {
  SERVER_URL,
  LOCAL_SERVER_URL,
  generateUID,
  selectRandomFromArray,
} from "./utils";
import { postData } from "./ajax";

let previousSearch = null;

function imgBoxHTML(index, value) {
  return `
  <div class="box" id="img-${index}-${generateUID()}">
    <div class="img-box">
      <img
      src="${value.url}"
      loading="lazy"
      alt="searched"
    />
    </div>
  </div>
  `;
}

function setContainer(value) {
  switch (value) {
    case "1" || 1:
      $(".result-container").hide();
      $("#getContainer").fadeIn();
      break;

    case "2" || 2:
      $(".result-container").hide();
      break;

    case "3" || 3:
      $(".result-container").hide();
      break;

    default:
      $(".result-container").hide();
      $("#editContainer").fadeIn();
      break;
  }
}

function setResult(value) {
  $("#loadingContainer").hide();
  $(`#${value}Container`).show();
  $(`#${value}Container #${value}Box #${value}DefaultBox`).hide();
  $(`#${value}Container #${value}Box #${value}ViewBox`).fadeIn();
}

$(window).on("load", function () {
  //   const URL = SERVER_URL;
  const URL = LOCAL_SERVER_URL;
  const form = document.getElementById("formBox");

  const prompt_data = {
    prompt: "",
  };

  $("#selectBox").on("change", function (e) {
    setContainer($(this).val());
  });

  function getImages() {
    postData(URL + "get", JSON.stringify(prompt_data), function (response) {
      // prompt_data.prompt = "";
      if (response) {
        if (response.images.length > 0) {
          setResult("get");
          $.each(response.images, function (index, value) {
            $("#getViewBox").append(imgBoxHTML(index, value));
          });
        }
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    $("#inputBox").val($("#inputBox").val().trim());

    const data = new FormData(form);
    const searchText = data.get("prompt");

    if (searchText.trim() === "") {
      return false;
    }

    prompt_data.prompt = searchText.trim();
    previousSearch = prompt_data.prompt;

    // set loading container
    $(".result-container").hide();
    $("#loadingContainer").show();

    switch ($("#selectBox").val()) {
      case "1" || 1:
        getImages();
        break;

      case "2" || 2:
        break;

      case "3" || 3:
        break;

      default:
        getImages();
        break;
    }
  }

  $("#formBox").on("submit", handleSubmit);
  $("#formBox").on("keyup", function (e) {
    const keyCode = e.which || e.keyCode;

    if (keyCode === 65 && e.ctrlKey) {
      if (previousSearch) {
        $("#inputBox").val(previousSearch);
      }
    }

    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  });
});
