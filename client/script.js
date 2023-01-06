import {
  SERVER_URL,
  LOCAL_SERVER_URL,
  generateUID,
  selectRandomFromArray,
} from "./utils";
import { postData } from "./ajax";

let previousSearch = null;

$(window).on("load", function () {
  //   const URL = SERVER_URL;
  const URL = LOCAL_SERVER_URL;
  const form = document.getElementById("formBox");

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

  const prompt_data = {
    prompt: "",
  };

  function getImages() {
    postData(URL, JSON.stringify(prompt_data), function (response) {
      // prompt_data.prompt = "";
      if (response) {
        if (response.images.length > 0) {
          $.each(response.images, function (index, value) {
            $("#galleryBox").append(imgBoxHTML(index, value));
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
    // form.reset();

    console.log($("#selectBox").val());

    getImages();
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
