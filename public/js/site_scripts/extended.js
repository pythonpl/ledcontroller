let group = 0;

function changeEven() {
  group = 0;
}

function changeOdd() {
  group = 1;
}


initPicker();

function initPicker() {
  $("#picker").empty();
  const colorPicker = new iro.ColorPicker("#picker");

  colorPicker.on("color:change", (color) => {
    $.ajax({
      url: "/ledMulticolor",
      method: "POST",
      data: {
        leds: group,
        color: color.hexString,
      },
    })
      .then(function (data) {})
      .catch(function () {});
  });
}
