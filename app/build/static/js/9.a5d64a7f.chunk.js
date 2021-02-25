(this["webpackJsonpmovie-reminder"]=this["webpackJsonpmovie-reminder"]||[]).push([[9],{37:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(12),r=n(13),i="dc090ca63005b139171720979eb0186c",c=function(){function e(){Object(a.a)(this,e),this.apiBaseUrl="https://api.themoviedb.org/3",this.imageBaseUrl="https://image.tmdb.org/t/p"}return Object(r.a)(e,[{key:"getImageMovie",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return e?"".concat(this.imageBaseUrl,"/w").concat(t).concat(e):"".concat("","/placeholder.jpg")}},{key:"getActorProfile",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200;return e?"".concat(this.imageBaseUrl,"/w").concat(t).concat(e):"https://via.placeholder.com/200x300"}},{key:"searchMovie",value:function(e,t){var n=this;return new Promise((function(a,r){var c="".concat(n.apiBaseUrl,"/search/movie?api_key=").concat(i,"&language=fr-FR&query=").concat(e,"&page=").concat(t);fetch(c).then((function(e){return e.json()})).then((function(e){7===e.status_code?r(e.status_message):a(e.results)}))}))}},{key:"getActorDetails",value:function(e){var t=this;return new Promise((function(n,a){var r="".concat(t.apiBaseUrl,"/person/").concat(e,"?api_key=").concat(i,"&language=fr-FR");fetch(r).then((function(e){return e.json()})).then((function(e){return e?n(e):a()}))}))}},{key:"getActorMovies",value:function(e){var t=this;return new Promise((function(n,a){var r="".concat(t.apiBaseUrl,"/person/").concat(e,"/movie_credits?api_key=").concat(i,"&language=fr-FR");fetch(r).then((function(e){return e.json()})).then((function(e){return e?n(e):a()}))}))}},{key:"getMovieDetail",value:function(e){var t=this;return new Promise((function(n,a){var r="".concat(t.apiBaseUrl,"/movie/").concat(e,"?api_key=").concat(i,"&language=fr-FR");fetch(r).then((function(e){return e.json()})).then((function(e){7===e.status_code?a(e.status_message):n(e)}))}))}},{key:"getMovieCredits",value:function(e){var t=this;return new Promise((function(n,a){var r="".concat(t.apiBaseUrl,"/movie/").concat(e,"/credits?api_key=").concat(i,"&language=fr-FR");fetch(r).then((function(e){return e.json()})).then((function(e){7===e.status_code?a(e.status_message):n(e)}))}))}}]),e}()},40:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return u}));var a=n(35),r=n.n(a),i=n(36),c=n(42),o=function(){var e=Object(i.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.a)("movies",1,{upgrade:function(e,t,n){var a=e.createObjectStore("favorites",{keyPath:"id",autoIncrement:!0});a.createIndex("title","title"),a.createIndex("movieId","movieId")}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),s=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){var a=t.id,c=t.title,s=t.overview,u=t.poster_path,l=t.release_date;o().then(function(){var t=Object(i.a)(r.a.mark((function t(i){var o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.getAllFromIndex("favorites","title");case 2:if(o=t.sent,o.find((function(e){return e.movieId===a}))){t.next=10;break}return t.next=7,i.add("favorites",{movieId:a,title:c,overview:s,poster_path:u,release_date:l});case 7:e(),t.next=11;break;case 10:n("Movie always in DB");case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(e){console.error(e),n(e)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){o().then(function(){var n=Object(i.a)(r.a.mark((function n(a){var i;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.getKeyFromIndex("favorites","movieId",t);case 2:return i=n.sent,n.next=5,a.delete("favorites",i);case 5:e();case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(e){n(e)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},47:function(e,t,n){"use strict";n.r(t);var a=n(35),r=n.n(a),i=n(36),c=n(12),o=n(13),s=n(14),u=n(15),l=n(0),m=n.n(l),v=n(42),f=n(5),p=n(39),d=n.n(p),h=n(40),g=n(37),b=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).fetchMovie=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.movieFinder.getMovieDetail(t).then((function(e){a.movieFinder.getMovieCredits(t).then((function(t){a.setState({movie:{details:e,casting:t}})})).catch((function(e){a.setState({errorFetch:!0})}))})).catch((function(e){a.setState({errorFetch:!0})}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.renderMovieBtnAction=function(){var e=Object(i.a)(r.a.mark((function e(t){var n,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(v.a)("movies",1);case 2:return n=e.sent,a.setState({db:n}),e.next=6,n.getAllFromIndex("favorites","title");case 6:if(i=e.sent,!i.find((function(e){return e.movieId===parseInt(t)}))){e.next=10;break}return e.abrupt("return",a.setState({isMovieInFav:!0}));case 10:return e.abrupt("return",a.setState({isMovieInFav:!1}));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.seeCastingMember=function(e){return a.props.history.push("/actor/".concat(e))},a.renderCastingMovie=function(e){return e.cast&&e.cast.length?e.cast.map((function(e,t){if(t>4)return!1;var n=a.movieFinder.getActorProfile(e.profile_path);return m.a.createElement("li",{key:"".concat(e.id,"-").concat(t),className:"movie-details__actor cursorPointer"},m.a.createElement("img",{src:n,alt:"profil de l'acteur ".concat(e.name),onClick:function(){return a.seeCastingMember(e.id)}}),m.a.createElement("p",null,e.name),m.a.createElement("p",null,m.a.createElement("span",{role:"img","aria-label":"emoji cin\xe9ma"},"\ud83c\udfac")," ",e.character))})):m.a.createElement("p",null,"Impossible d'afficher le casting de ce film")},a.addMovieInFavAndRegenerateList=function(){Object(h.a)(a.state.movie.details).then((function(){a.setState({isMovieInFav:!0})})).catch((function(e){console.error(e)}))},a.deleteMoviefromFavAndRegenerateList=function(){Object(h.b)(a.state.movie.details.id).then((function(){a.setState({isMovieInFav:!1})})).catch((function(e){console.error(e)}))},a.renderMovie=function(e){var t=e.details,n=e.casting,r=a.movieFinder.getImageMovie(t.poster_path,500),i=null;t.budget&&(t.budget>1e6&&(i="".concat(t.budget/1e6," M$")),i="".concat(i," $"));var c=a.state.isMovieInFav?m.a.createElement("button",{onClick:a.deleteMoviefromFavAndRegenerateList,className:"btn-action remove-from-favorites"},"Supprimer des favoris"):m.a.createElement("button",{onClick:a.addMovieInFavAndRegenerateList,className:"btn-action add-to-favorites"},"Ajouter aux favoris");return m.a.createElement("div",{className:"layout-single__primary"},m.a.createElement("div",{className:"layout-single__primary__cover"},m.a.createElement("img",{src:r,alt:"Affiche de ".concat(t.title)}),c),m.a.createElement("div",{className:"layout-single__primary__infos"},m.a.createElement("h1",null,t.title),m.a.createElement("div",{className:"layout-single__left-main"},m.a.createElement("p",{className:"movie-details__release"},m.a.createElement("span",{role:"img","aria-label":"emoji calendrier"},"\ud83d\uddd3")," ",d()(t.release_date).format("DD/MM/YYYY")),t.vote_average&&m.a.createElement("p",null,m.a.createElement("span",{role:"img","aria-label":"emoji \xe9toile"},"\u2b50\ufe0f")," ",t.vote_average,"/10"),i&&m.a.createElement("p",null,m.a.createElement("span",{role:"img","aria-label":"emoji dollar"},"\ud83d\udcb5")," ",i),t.overview&&m.a.createElement("p",{className:"longText"},m.a.createElement("span",{role:"img","aria-label":"emoji stylo plume"},"\ud83d\udd8b")," ",t.overview),m.a.createElement("ul",{className:"movie-details__genders","arial-label":"genres"},t.genres.map((function(e,t){return m.a.createElement("li",{key:"".concat(e,"-").concat(t),className:"btn-action category disabledBtn"},e.name)})))),m.a.createElement("h2",null,"Casting"),m.a.createElement("ul",{className:"movie-layout-single__right"},a.renderCastingMovie(n))))},a.state={movie:void 0,errorFetch:void 0,indexedDbSupported:"indexedDB"in window,isMovieInFav:void 0,db:void 0},a.movieFinder=new g.a,a}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.props.match.params&&this.props.match.params.id?(this.fetchMovie(this.props.match.params.id),this.renderMovieBtnAction(this.props.match.params.id)):console.log("Impossible de r\xe9cup\xe9rer le d\xe9tail du film")}},{key:"render",value:function(){return m.a.createElement("section",{className:"single-layout movie-details"},this.state.errorFetch&&m.a.createElement("p",null,"Impossible de r\xe9cup\xe9rer les informations du film ",this.props.params.match.id),this.state.movie&&this.renderMovie(this.state.movie))}}]),n}(m.a.Component);t.default=Object(f.f)(b)}}]);
//# sourceMappingURL=9.a5d64a7f.chunk.js.map