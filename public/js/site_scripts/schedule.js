function cancelSchedule(id) {
    $.ajax({
        url: `/schedule/${id}`,
        method: 'DELETE'
    }).then(function () {
        window.location.reload();
    }).catch(function () { });
}