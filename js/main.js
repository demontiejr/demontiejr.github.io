var menu = $('nav#menu');

var watcher = scrollMonitor.create( menu );

watcher.lock();

watcher.stateChange(function() {
    $(menu).toggleClass('scrolled', this.isAboveViewport)
});

$(window).load(function() {
// This function will be executed when the user scrolls the page.
    $(window).scroll(function (e) {
        // -------------------- Select ----------------------------
        var lastId,
            topMenuHeight = $(menu).outerHeight() + 15,
        // All list items
            menuItems = $(menu).find("a"),
        // Anchors corresponding to menu items
            scrollItems = menuItems.map(function () {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });

        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop) return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems.parent().removeClass("active")
                .end().filter("[href=#" + id + "]").parent().addClass("active");
        }
    });
});

/* ============= Util functions ============= */

function addClass(field, className) {
    if (!field.className.match(new RegExp(className))) {
        field.className += " " + className;
    }
}

String.prototype.remove = function(toRemove) {
    return this.replace(new RegExp(toRemove, "g"), "").trim();
}

function removeClass(field, className) {
    field.className = field.className.remove(className);
}

function getFormFields(form) {
    tagNames = ['input', 'textarea'];
    var fields = [];

    for (var i=0; i < tagNames.length; i++) {
        var elements = form.getElementsByTagName(tagNames[i]);
        for (var j=0; j < elements.length; j++)
            fields.push(elements[j]);
    }

    return fields;
}

function clearForm(form) {
    var fields = getFormFields(form);

    for (var i=0; i < fields.length; i++) {
        fields[i].value = "";
        removeClass(fields[i], "invalid-field");
    }
}

function validate(field) {
    var valid = true;

    if (field.type == "email") {
        var mailPattern = /[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/;
        var valid = mailPattern.test(field.value);
    } else {
        valid = field.value != "";
    }

    if (!valid) {
        addClass(field, "invalid-field");
    } else {
        removeClass(field, "invalid-field");
    }
}