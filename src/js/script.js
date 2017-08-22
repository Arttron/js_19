/**
 * Created by User on 19.08.2017.
 */
(function($) {
    $(function() {
        $('.jcarousel').jcarousel();

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination();
    });
})(jQuery);
(function($, _) {

    var allPanels = $('.accordion > dd').hide();
    $(allPanels[0]).parent().children("dt:first-child").addClass("active").children(".plus").text("--");
    $(allPanels[0]).show();
    $('.accordion > dt > a').click(function() {
        allPanels.slideUp();
        console.log(allPanels.parent().children("dt"));
        allPanels.parent().children("dt").removeClass("active").children(".plus").text("+");
        $(this).parent().addClass("active").children(".plus").text("--");
        $(this).parent().next().slideDown();
        return false;
    });

    $(".search-form__button").click(()=>{
       alert("Результаты поиска: " + $(".search-form__input").val());
    });
     //***********************************//
    var skillsOut = [],
        namesOut = [],
        friendsOut = [];
    var data;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            data = xhttp.responseText;
            var dataParse = JSON.parse(data);
            dataFilter(dataParse);
        }
    };
    xhttp.open("GET", "./js/data.json", true);
    xhttp.send();
    function dataFilter(jsonData){
        jsonData = _.sortBy(jsonData, (o)=>{
            return o.friends.length;
        });
        _.map(jsonData, (arr)=>{
            skillsOut = _.concat(skillsOut, arr.skills);
            namesOut = _.concat(namesOut, arr.name);
            _.map(arr.friends, (fr)=>{
                friendsOut = _.concat(friendsOut, fr.name);
                return true;
            });

            return true;
        });
        friendsOut.sort();
        friendsOut = _.sortedUniq(friendsOut);
        skillsOut.sort();
        skillsOut = _.sortedUniq(skillsOut);
        console.log("Skills: "+skillsOut.length+" "+skillsOut);
        console.log("Names: "+namesOut.length+" "+namesOut);
        console.log("Friends: "+friendsOut.length+" "+friendsOut);
        alert("Names:\nQuantity: "+namesOut.length+" \n"+namesOut+'\n\n'+"Friends:\nQuantity: "+friendsOut.length+" \n"+friendsOut+'\n\n'+"Skills:\nQuantity: "+skillsOut.length+skillsOut);
    }
})(jQuery, _);
