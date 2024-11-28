source("init.R")

Rserve::run.Rserve(
    websockets.port = "8942",
    websockets = TRUE,
    oob = TRUE,
    http.port = "8080",
    qap = FALSE,
    websockets.qap.oc = TRUE
)
