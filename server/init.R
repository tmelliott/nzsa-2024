library(Rserve)

wrap.js.fun <- function(s) {
    if (class(s) != "javascript_function") {
        stop("Can only wrap javascript_function s")
    }
    function(...) {
        Rserve::self.oobMessage(list(s, ...))
    }
}

source("server/app.R")
oc.init <- function() app
