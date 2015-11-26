/************
 * 遮罩
 *
 ************/

/**
 *
 * @param target
 * @param insertAfterElement
 * @param layerId
 * @returns {boolean}
 */
export function addMaskLayer(target, insertAfterElement, layerId) {
  const $target = $(target)
  if (!$target) {
    return false
  }
  const iframeOffset = $(target).offset()

  $('<div/>', {
    'id': 'mask' + layerId,
    'css': {
      'position': 'absolute',
      'top': iframeOffset.top,
      'left': iframeOffset.left,
      'width': $target.width(),
      'height': $target.height(),
      'background': '#cc99cc',
      'opacity': 0.4
    }
  }).insertAfter(insertAfterElement)
}

/**
 *
 * @param target
 */
export function removeMaskLayer(target) {
  /**
   * 这一段有点丑啊
   * Todo : 给每个 Dropdown 起名字 data-id
   * 然后返回 id, remove
   */
  $('div[id^=mask]').last().remove()
}
