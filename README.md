jQuery Dress
============

Wraps unstylable form inputs into stylable ones (`.dress-select`, `.dress-checkbox` and `.dress-radio` for now).

Changes
-------
#### 0.2
Initial Beta. Currently wraps `<select>`, `<input type="checkbox">` and `<input type="radio">`.

#### 0.3
Major improvements. Added support for `.dressed` and `.ignore-dressing`.

#### 0.4
Added support for `:focus` state, `.dress-focused`.

#### 0.5
Added support for `[type=number]`. Minor bugfixes.

#### 0.6
Now your gorgeous elements are wrapped automatically. (I didn't manage `DOMTreeModified` event to work, so I use `$.ajaxSuccess()` for now as we usually modify DOM at this point)


Future improvements
-------------------

- Find a better solution to automatically dress new elements (it is using `$.ajaxSuccess()` at the moment as `DOMTreeModified` doesn't really work).


