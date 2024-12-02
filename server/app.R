app <- ocap(function() {
    modes <- integer()
    list(
        version = ocap(function() R.version.string),
        histSample = ocap(function(n) {
            x <- if (length(modes)) {
                rnorm(n, sample(modes))
            } else {
                rnorm(n, ifelse(rbinom(n, 1, 0.2), 3, -1))
            }
            h <- hist(x[x > -10 & x < 10],
                breaks = seq(-10, 10, by = 1),
                plot = FALSE
            )
            list(counts = h$counts, breaks = h$breaks)
        }),
        addMode = ocap(function(x) {
            modes <<- c(modes, as.integer(x))
            modes
        })
    )
})
