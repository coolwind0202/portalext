# Portalext

Chrome Extension on Portal Website.

## Features

### Auto overwrite of Lecture link

By default, in the top page of portal, you can't open lecture page links on timetable in new tab.
This extension will overwrite lecture page links to make it openable in other tab.

Source: `features/lecture/toppage.content.js`

### User-friendly textarea validation logic

#### Remove maxlength attribute
By default, `maxlength` attribute exists on each textarea elements.
But the attribute prevents to input as you wish.
For example, you can not input string over the `maxlength`.

This extension provide validation without `maxlength` attribute.

#### Fix Bugs related to CRLF
When JavaScript calculates `String.length` property, it count a newline character as 1.
Because JavaScript process the character as `CR`.
But, in backend of the portal, the character will be interpreted as `CRLF`.
This extension counts the character as 2 (`CRLF`).

#### Fix Bugs related to trim of textarea value

The backend trims whitespaces in textarea value, saving it to database.
This extension trims whitespaces before counts the length.

Source: `features/textarea_validation/lecture.content.js`

## Usage

1. Clone or download as zip file this repository.
2. On chrome extension setting screen, load the directory you made on `1.` step.