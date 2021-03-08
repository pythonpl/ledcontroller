$(document).ready(function () {
    $("#otPicker").datetimepicker({
        format: 'Y-m-d H:i'
    });

    $("#cyPicker").datetimepicker({
        datepicker: false,
        format: 'H:i'
    });
});

function cancelSchedule(id) {
    $.ajax({
        url: `/schedule/${id}`,
        method: 'DELETE'
    }).then(function () {
        window.location.reload();
    }).catch(function () { });
}

function addOTEvent(){
    $.ajax({
        url: '/schedule',
        method: 'POST',
        data: {
          type: $("input:radio[name=otType]:checked").val(),
          oneTime: true,
          date: $('#otPicker').val()
        }
    }).then(function () {
        window.location.reload();
    }).catch(function () { });
}

function addCycEvent(){
    $.ajax({
        url: '/schedule',
        method: 'POST',
        data: {
          type: $("input:radio[name=cyType]:checked").val(),
          oneTime: false,
          date: $('#cyPicker').val()
        }
    }).then(function () {
        window.location.reload();
    }).catch(function () { });
}