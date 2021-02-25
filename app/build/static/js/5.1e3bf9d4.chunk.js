(this["webpackJsonpmovie-reminder"]=this["webpackJsonpmovie-reminder"]||[]).push([[5],{37:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(12),r=n(13),i="dc090ca63005b139171720979eb0186c",o=function(){function e(){Object(a.a)(this,e),this.apiBaseUrl="https://api.themoviedb.org/3",this.imageBaseUrl="https://image.tmdb.org/t/p"}return Object(r.a)(e,[{key:"getImageMovie",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return e?"".concat(this.imageBaseUrl,"/w").concat(t).concat(e):"".concat("","/placeholder.jpg")}},{key:"getActorProfile",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200;return e?"".concat(this.imageBaseUrl,"/w").concat(t).concat(e):"https://via.placeholder.com/200x300"}},{key:"searchMovie",value:function(e,t){var n=this;return new Promise((function(a,r){var o="".concat(n.apiBaseUrl,"/search/movie?api_key=").concat(i,"&language=fr-FR&query=").concat(e,"&page=").concat(t);fetch(o).then((function(e){return e.json()})).then((function(e){7===e.status_code?r(e.status_message):a(e.results)}))}))}},{key:"getActorDetails",value:function(e){var t=this;return new Promise((function(n,a){var r="".concat(t.apiBaseUrl,"/person/").concat(e,"?api_key=").concat(i,"&language=fr-FR");fetch(r).then((function(e){return e.json()})).then((function(e){return e?n(e):a()}))}))}},{key:"getActorMovies",value:function(e){var t=this;return new Promise((function(n,a){var r="".concat(t.apiBaseUrl,"/person/").concat(e,"/movie_credits?api_key=").concat(i,"&language=fr-FR");fetch(r).then((function(e){return e.json()})).then((function(e){return e?n(e):a()}))}))}},{key:"getMovieDetail",value:function(e){var t=this;return new Promise((function(n,a){var r="".concat(t.apiBaseUrl,"/movie/").concat(e,"?api_key=").concat(i,"&language=fr-FR");fetch(r).then((function(e){return e.json()})).then((function(e){7===e.status_code?a(e.status_message):n(e)}))}))}},{key:"getMovieCredits",value:function(e){var t=this;return new Promise((function(n,a){var r="".concat(t.apiBaseUrl,"/movie/").concat(e,"/credits?api_key=").concat(i,"&language=fr-FR");fetch(r).then((function(e){return e.json()})).then((function(e){7===e.status_code?a(e.status_message):n(e)}))}))}}]),e}()},38:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(39),o=n.n(i);t.a=function(e){var t=null;return e.viewOnly||(t=r.a.createElement("button",{onClick:function(){return e.addToFavorite(e.movie)},className:"btn-action add-to-favorites"},"Ajouter"),(e.onlyDelete||e.movie.inFav)&&(t=r.a.createElement("button",{onClick:function(){return e.deleteMovieFromFavorites(e.movie)},className:"btn-action remove-from-favorites"},"Supprimer"))),r.a.createElement("li",{className:"movie-card"},navigator.onLine&&r.a.createElement("img",{src:e.movieImage,onClick:function(){return e.seeMovieDetails(e.movie.id)},alt:"Affiche de ".concat(e.movie.title),className:"movie-card__img cursorPointer"}),r.a.createElement("p",{className:"movie-card__title"},e.movie.title),r.a.createElement("p",{className:"movie-card__release"},o()(e.movie.release_date).format("DD/MM/YYYY")),r.a.createElement("div",{className:"movie-card__action"},e.indexedDbSupported&&t,navigator.onLine&&r.a.createElement("button",{onClick:function(){return e.seeMovieDetails(e.movie.id)},className:"btn-action movie-details"},"D\xe9tails")))}},40:function(e,t,n){"use strict";n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return u}));var a=n(35),r=n.n(a),i=n(36),o=n(42),c=function(){var e=Object(i.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.a)("movies",1,{upgrade:function(e,t,n){var a=e.createObjectStore("favorites",{keyPath:"id",autoIncrement:!0});a.createIndex("title","title"),a.createIndex("movieId","movieId")}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),s=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){var a=t.id,o=t.title,s=t.overview,u=t.poster_path,v=t.release_date;c().then(function(){var t=Object(i.a)(r.a.mark((function t(i){var c;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.getAllFromIndex("favorites","title");case 2:if(c=t.sent,c.find((function(e){return e.movieId===a}))){t.next=10;break}return t.next=7,i.add("favorites",{movieId:a,title:o,overview:s,poster_path:u,release_date:v});case 7:e(),t.next=11;break;case 10:n("Movie always in DB");case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(e){console.error(e),n(e)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){c().then(function(){var n=Object(i.a)(r.a.mark((function n(a){var i;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.getKeyFromIndex("favorites","movieId",t);case 2:return i=n.sent,n.next=5,a.delete("favorites",i);case 5:e();case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(e){n(e)}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},46:function(e,t,n){"use strict";n.r(t);var a=n(35),r=n.n(a),i=n(36),o=n(12),c=n(13),s=n(14),u=n(15),v=n(0),l=n.n(v),m=n(5),f=n(40),d=n(38),p=n(37),h=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).getFavoritesMovies=function(){Object(f.c)().then(function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.t1=t,e.next=4,t.getAllFromIndex("favorites","title");case 4:e.t2=e.sent,e.t3={db:e.t1,movies:e.t2},e.t0.setState.call(e.t0,e.t3);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.error(e)}))},a.deleteMovieAction=function(e){Object(f.b)(e).then((function(){var t=a.state.movies.filter((function(t){return t.movieId!==e}));a.setState({movies:t})})).catch((function(e){console.error(e)}))},a.seeMovieDetails=function(e){a.props.history.push("/movie/".concat(e))},a.deleteMoviefromFavAndRegenerateList=function(e){Object(f.b)(e.movieId).then((function(){var t=a.state.movies.filter((function(t){return t.movieId!==e.movieId}));a.setState({movies:t})})).catch((function(e){console.error(e)}))},a.state={indexedDbSupported:"indexedDB"in window,movies:void 0,db:void 0},a.movieFinder=new p.a,a}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.getFavoritesMovies()}},{key:"render",value:function(){var e,t=this;return l.a.createElement("section",{className:"favorites-page"},l.a.createElement("h1",null,"Mes films"),!navigator.onLine&&l.a.createElement("p",null,l.a.createElement("span",{role:"img","aria-label":"\xe9moji \xe9clair"},"\u26a1\ufe0f")," Pour pouvoir consulter le d\xe9tail de vos films favoris merci d'activer votre connexion ",l.a.createElement("span",{role:"img","aria-label":"\xe9moji \xe9clair"},"\u26a1\ufe0f")),this.state.movies&&0===this.state.movies.length&&l.a.createElement("p",{className:"no-favories"},"Aucun film n'est enregistr\xe9 dans vos favoris ",l.a.createElement("span",{role:"img","aria-label":"emoji triste"},"\ud83d\ude29")),this.state.movies&&this.state.movies.length>0&&(e=this.state.movies,t.state.indexedDbSupported?l.a.createElement("ul",{className:"layout-list"},e.map((function(e){return l.a.createElement(d.a,{movieImage:t.movieFinder.getImageMovie(e.poster_path,200),movie:e,key:"".concat(e.id,"-").concat(e.release_date),indexedDbSupported:t.state.indexedDbSupported,deleteMovieFromFavorites:t.deleteMoviefromFavAndRegenerateList,seeMovieDetails:function(){return t.seeMovieDetails(e.movieId)},onlyDelete:!0})}))):l.a.createElement("p",null,"Vous devriez utiliser un navigateur moderne pour pouvoir consulter vos films pr\xe9f\xe9r\xe9s")))}}]),n}(l.a.Component);t.default=Object(m.f)(h)}}]);
//# sourceMappingURL=5.1e3bf9d4.chunk.js.map