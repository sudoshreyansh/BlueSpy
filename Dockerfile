FROM ubuntu

RUN apt-get update
RUN apt-get install -y \
            curl \
            wget

RUN export PATH=/opt:$PATH

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get update && \
    apt-get install -y nodejs

RUN cd /opt && \
    mkdir scorecard && cd scorecard && \
    wget https://github.com/ossf/scorecard/releases/download/v4.4.0/scorecard_4.4.0_linux_amd64.tar.gz && \
    tar -xf scorecard_4.4.0_linux_amd64.tar.gz && \
    rm scorecard_4.4.0_linux_amd64.tar.gz && \
    mv scorecard-linux-amd64 scorecard
