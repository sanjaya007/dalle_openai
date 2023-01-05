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

  function imgBoxHTML() {
    <div class="box">
      <div class="img-box">
        <img
          src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-OHckDQAn9F7p3LjLRPiP6BEF/user-6NyVItkADdXw52o6brYfgoT5/img-7HNE1XL86MMOLcBlnpdJGBTQ.png?st=2023-01-05T12%3A25%3A29Z&se=2023-01-05T14%3A25%3A29Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-05T11%3A48%3A31Z&ske=2023-01-06T11%3A48%3A31Z&sks=b&skv=2021-08-06&sig=GzD/feGsmrHEKFeeLA08XohhKfxP0yeNvGouNBzbp18%3D"
          alt="searched"
        />
      </div>
    </div>;
  }

  const prompt_data = {
    prompt: "",
  };

  function getImages() {
    postData(URL, JSON.stringify(prompt_data), function (response) {
      prompt_data.prompt = "";
      if (response) {
        console.log(response);
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(form);
    const searchText = data.get("prompt");

    if (searchText.trim() === "") {
      return false;
    }

    prompt_data.prompt = searchText.trim();
    previousSearch = prompt_data.prompt;
    form.reset();

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
