# Progressiv Web App : TodoList

## Table of Contents
- [Introduction](#introduction)
- [Project Setup](#project-setup)
  * [Prerequisites](#prerequisites)
  * [How To Install](#how-to-install)
  * [How To Run](#how-to-run)
  * [Further Help](#further-help)
- [Libraries used](#libraries-used)
- [Additional Features](#additional-features)
  * [Local Storage](#local-storage)
  * [Delete all Items](#delete-all-items)
  * [QR Code](#qr-code)
  * [Speech Recognition](#speech-recognition)
- [Difficulties and Problems encountered](#difficulties-and-problems-encountered)
  
## Introduction

The goal of the application was to achieve as faithfully as possible the Todolist of [TodoMVC](http://todomvc.com/examples/vanillajs/), with the Angular framework.
After successfully completing this step, additional features could be added, which are described below.

## Project Setup

### Prerequisites

You need to have Node and NPM installed on your PC.

[Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


### How To Install

Download the source code :
- with git :
```text
git clone https://github.com/heloise-d/PWA_Todolist
```
- or by uploading the code directly to github.

Open a terminal window and go to the project root folder.

You need to have npm installed globally.

Run `npm install` to install the required libraries.


### How To Run
Open a terminal window and go to the project root folder.

Run `npm start` for a dev server.

Navigate to `http://localhost:4200/`.


### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Libraries used
The following module libraries are used:
```text
Angular CLI: 8.3.9
angularx-qrcode
```

## Additional Features

### Local Storage

The application serializes / de-serializes data locally with the local storage, to backup the data locally.
Each time the todolist is modified, the localStorage is updated accordingly :
- When an item is deleted from the todolist, the item stored in the local storage is also deleted
- When an item's label is changed from the todolist, the item stored in local storage is first deleted, and a new item in local storage is created with the new label.
- When the label of an item is deleted from the todolist, the item stored in the local storage is also deleted

So when the application is reopened, the Storage local is browsed, and each item of local storage is added to the todolist, so that the user can find his data even if the program is closed or reopened.


### Delete all Items

At the user's request, the application can delete all the items present in the todolist, by clicking on a button.
This feature allows to delete all items at once instead of deleting one item at a time.
This functionality was created by simply browsing the todolist, and deleting each of the items one by one.

### QR Code

The application can generate a todolist QR Code, which will contain all the items in the list. This functionality is achieved thanks to the `angularx-qrcode` module.

`angularx-qrcode` is a fast and easy-to-use Ionic 3/4/5 and Angular4-10 QR Code component/module library to generate QR Codes (Quick Response) in your Ionic and Angular 4/5/6/7/8/9/10 app with support for AOT and the Ivy compiler and runtime. It is a drop-in replacement for the no-longer-maintained angular2 component ng2-qrcode and based on node-qrcode.

Each time the list is modified, the QR Code is updated to correspond to the todolist. The user can thus scan the QR Code displayed on the screen on his smartphone to be able to access it.


### Speech Recognition

In order to perform voice recognition, the `Web Speech API` is used. This API is only supported for the following browsers :
- Google chrome
- Chrome for Android
- Samsung Internet
- QQ Browser
- Baidu Browser

To use the voice recognition of the application, the user will have to click on the microphone image in the todolist, and speak. At the end of his sentence, he will simply have to press the microphone button again, and a new item will be automatically created, labeled with the sentence spoken by the user.



## Difficulties and Problems encountered


I had some difficulties with getting started with the Angular framework, especially at the beginning to transmit information from one component to another. I found the solution, and could more easily understand the framework.

While implementing routing, I also encountered a problem. I was getting routing errors, where Angular was failing to match any routes. Ultimately, this problem was that my routes were misconfigured, and I needed to configure a default route, which I hadn't done.

I have encountered some difficulty with speech recognition. I first tried using a plug-in, but failed to implement speech recognition in this way. I finally used the `Web Speech API`, which didn't require a module and was easy to install and configure. However, this API is only available on Google Chrome.




# PWA-TP3

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


