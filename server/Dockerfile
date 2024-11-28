FROM r-base:latest

# Install R packages
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev
RUN R -e "install.packages('pak'); print(.libPaths())"
RUN R -e "pak::pkg_install('Rserve')"

COPY . .
RUN R -e 'system("grep -o \"[a-zA-Z]*::\" app.R | grep -o \"[a-zA-Z]*\" | sort | uniq", intern = TRUE) |> try(pak::pak())'

CMD ["Rscript", "start.R"]
