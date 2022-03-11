import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

import App from "./App"

import "./index.css"

ReactDOM.render(
  // <TransactionsProvider>
  //   <MarketFilterProvider>
      <BrowserRouter>
      <div className="bg-[#0d1429]">
        <Switch>
          <Route path="/" exact component={App} />
          <Redirect from="*" to="/" />  
        </Switch>
      </div>
      </BrowserRouter>
  //   </MarketFilterProvider>
  // </TransactionsProvider>
  ,
  document.getElementById("root"),
);
