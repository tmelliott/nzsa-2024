app <- ocap(function() {
    list(
        version = ocap(function() R.version.string),
        histSample = ocap(function(n) {
            h <- hist(
                rnorm(n, ifelse(rbinom(n, 1, 0.2), 3, -1)),
                breaks = seq(-10, 10, by = 1),
                plot = FALSE
            )
            list(
                counts = h$counts,
                breaks = h$breaks
            )
        })
    )
})
