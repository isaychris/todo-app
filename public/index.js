$('document').ready(function () {
    $('form').submit(function () {
        console.log('submit clicked');

        $.ajax({
            type: 'post',
            url: 'add',
            data: {
                todo: $('form input').val()
            }
        });
    });

    $('button.remove').click(function () {
        if (confirm("Are you sure you want to delete?")) {
            console.log('remove clicked');

            $.ajax({
                type: 'delete',
                url: '/delete',
                data: {
                    id: $(this).data('id')
                },
                success: function (res) {
                    console.log('nice');
                    location.href = "/";
                }
            });
        }
    });
});