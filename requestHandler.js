"use-strict";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";

import axios from "axios";

import reducers from "./src/reducers/index";
import routes from "./src/routes";

module.exports = function handleRender(req, res) {
  axios
    .get("http://localhost:3001/books")
    .then(function(response) {
      //   var myHtml = JSON.stringify(response.data);
      //   res.render("index", { myHtml });

      // redux store on sever
      const store = createStore(reducers, { books: { books: response.data } });
      // initial state from store
      const initialState = JSON.stringify(store.getState())
        .replace(/<\/script/g, "<\\/script")
        .replace(/<!--/g, "<\\!--");
      // implement react-router
      const Routes = {
        routes: routes,
        location: req.url
      };
      match(Routes, function(err, redirect, props) {
        if (err) {
          res.status(500).send("Error with the request");
        } else if (redirect) {
          res.status(302, redirect.pathname + redirect.search);
        } else if (props) {
          const reactComponent = renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          );
          res.status(200).render("index", { reactComponent, initialState });
        } else {
          res.status(404).send("Not Found");
        }
      });
    })
    .catch(function(err) {
      console.log("#Initial Server-side rendering error");
    });
};
