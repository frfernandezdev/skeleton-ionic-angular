# SDK Android cmdline-tools
FROM ubuntu:20.04 AS sdk 

ARG ANDROID_BUILD_TOOLS_VERSION
ARG ANDROID_PLATFORMS_VERSION

ENV ANDROID_SDK_URL="https://dl.google.com/android/repository/commandlinetools-linux-8092744_latest.zip" 
ENV ANDROID_BUILD_TOOLS_VERSION=${ANDROID_BUILD_TOOLS_VERSION:-30.0.3} 
ENV	ANDROID_PLATFORMS_VERSION=${ANDROID_PLATFORMS_VERSION:-30} 
ENV ANDROID_SDK_ROOT="/opt/android"

ENV PATH $PATH:$ANDROID_SDK_ROOT/cmdline-tools/bin

WORKDIR /opt 

# Update and Upgrade OS
RUN apt-get -qq update && \
			apt-get -qq upgrade && \
			apt-get -qq install wget unzip 

# Java 8 
RUN apt-get -qq install openjdk-8-jdk
RUN update-alternatives --set java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java


# Installs Android SDK
RUN mkdir android && cd android && \
    wget -O tools.zip ${ANDROID_SDK_URL} && \
    unzip tools.zip && rm tools.zip

RUN yes | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --licenses

RUN sdkmanager --sdk_root=${ANDROID_SDK_ROOT} \ 
					"build-tools;${ANDROID_BUILD_TOOLS_VERSION}" \
					"platforms;android-${ANDROID_PLATFORMS_VERSION}"

# NVM
FROM ubuntu:20.04 AS nvm
 
WORKDIR /opt 

# Update and Upgrade OS
RUN apt-get -qq update && \
			apt-get -qq upgrade && \
			apt-get -qq install curl 

# NodeJS & Tools
ARG NODE_VERSION
ENV NODE_VERSION=${NODE_VERSION:-16.14.0} 
ENV	NVM_DIR=/root/.nvm 

RUN curl -s -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

RUN . "${NVM_DIR}/nvm.sh" && nvm install ${NODE_VERSION}


FROM ubuntu:20.04 

# Android & Tools
# https://developer.android.com/studio/#downloads
ARG ANDROID_BUILD_TOOLS_VERSION
ARG ANDROID_PLATFORMS_VERSION

ENV ANDROID_BUILD_TOOLS_VERSION=${ANDROID_BUILD_TOOLS_VERSION:-30.0.3} 
ENV	ANDROID_PLATFORMS_VERSION=${ANDROID_PLATFORMS_VERSION:-30} 
ENV ANDROID_SDK_ROOT="/opt/android" 
ENV BUNDLE_TOOL_URL="https://github.com/google/bundletool/releases/download/1.8.2/bundletool-all-1.8.2.jar"

ARG NODE_VERSION
ENV NODE_VERSION=${NODE_VERSION:-16.14.0} 
ENV	NVM_DIR=/root/.nvm 

ENV PATH $PATH:$ANDROID_SDK_ROOT/platform-tools
ENV PATH $PATH:$ANDROID_SDK_ROOT/build-tools/$ANDROID_BUILD_TOOLS_VERSION
ENV PATH $PATH:$ANDROID_SDK_ROOT/emulator
ENV PATH $PATH:$ANDROID_SDK_ROOT/tools/bin
ENV PATH $PATH:$NVM_DIR/versions/node/v${NODE_VERSION}/bin

WORKDIR /opt

COPY --from=sdk /opt/android /opt/android
COPY --from=nvm /root/.nvm /root/.nvm 

# Update and Upgrade OS
RUN apt-get -qq update && \
			apt-get -qq upgrade && \
			apt-get -qq install wget gradle 

# Java 8 
RUN apt-get -qq install openjdk-8-jdk
RUN update-alternatives --set java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java

RUN wget -q -O bundletool-all.jar ${BUNDLE_TOOL_URL} && \
			chmod a+x -R /opt/bundletool-all.jar && \
			chown -R root:root /opt/bundletool-all.jar && \
			echo "alias bundletool='java -jar /opt/bundletool-all.jar'" >> ~/.bashrc

# Nvm set version default 
RUN . "${NVM_DIR}/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "${NVM_DIR}/nvm.sh" && nvm alias default v${NODE_VERSION}

WORKDIR /app

RUN npm i -g cordova native-run @ionic/cli

COPY . .

RUN npm install 

EXPOSE 8101
