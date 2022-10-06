FROM ubuntu

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
            build-essential \
            fakeroot \
            devscripts \
            curl \
            git \
            make \
            wget \
            mc \
            unzip \
            nano \
            vim \
            dos2unix \
            sed \
            gcc \
            libpq-dev \
            make \
            apt-transport-https \
            python3 \
            python3-pip \
            python3-setuptools \
            python3-dev \
            python3-wheel \
            python-is-python3 \
            jq \
            gnupg \
            g++ \
            make \
            gcc \
            apt-utils \
            file \
            gettext \
            sqlite3 \
            software-properties-common

RUN export PATH=/opt:$PATH

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get update && \
    apt-get install -y nodejs

RUN cd /tmp && \
    wget -q https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb && \
    dpkg -i packages-microsoft-prod.deb && \
    add-apt-repository universe && \
    apt-get update && \
    rm packages-microsoft-prod.deb && \
    apt-get install -y dotnet-sdk-6.0 && \
    rm -rf /var/lib/apt/lists/*

RUN cd /opt && \
    mkdir scorecard && cd scorecard && \
    wget https://github.com/ossf/scorecard/releases/download/v4.4.0/scorecard_4.4.0_linux_amd64.tar.gz && \
    tar -xf scorecard_4.4.0_linux_amd64.tar.gz && \
    rm scorecard_4.4.0_linux_amd64.tar.gz && \
    mv scorecard-linux-amd64 scorecard

RUN cd /opt && \
    wget https://github.com/microsoft/ApplicationInspector/releases/download/v1.5.20/ApplicationInspector_linux_1.5.20.zip -O ApplicationInspector.zip && \
    unzip ApplicationInspector.zip && \
    rm ApplicationInspector.zip && \
    mv ApplicationInspector_linux_1.5.20 ApplicationInspector && \
    cd ApplicationInspector && \
    chmod a+x ./ApplicationInspector.CLI

RUN cd /opt && \
    wget https://github.com/microsoft/OSSGadget/releases/download/v0.1.336/OSSGadget_linux_0.1.336.tar.gz -O OSSGadget.tar.gz && \
    tar -xvf OSSGadget.tar.gz && \
    rm OSSGadget.tar.gz && \
    mv OSSGadget_linux_0.1.336 OSSGadget && \
    cd OSSGadget && \
    find . -name 'oss-*' -exec file {} \; | grep ELF | cut -d: -f1 | xargs -n1 -I{} chmod a+x {}

RUN pip install pandas requests

RUN cd /home && mkdir bluespy && cd bluespy
WORKDIR /home/bluespy

RUN mkdir src && npm install --global yarn
COPY package.json .
RUN yarn install
EXPOSE 3000

COPY ./src ./src
RUN cd src/modules/metadata/util/eval/scripts && chmod +x npm-sec.sh
CMD npm run start