  import { onMounted, ref } from 'vue'

  const useDragWidth = () => {
      const width = ref(0)
      const startX = ref(0)

      const dynamicWidth = ref()

      const getDivWidth = () => parseInt((getComputedStyle(document.querySelector('#box')).width), 10)

      onMounted(() => {
          width.value = getDivWidth()
          dynamicWidth.value = getDivWidth()
          // 监听事件, 鼠标点击事件
          document.querySelector('#x').addEventListener('click', preDrag)

      })
      // 鼠标点击触发准备拖动事件
      function preDrag() {
          // 监听鼠标按下事件
          document.documentElement.addEventListener('mousedown', startDrag)
      }

      function stopDrag() {
          document.documentElement.removeEventListener('mousemove', onDrag)
          document.documentElement.removeEventListener('mousedown', startDrag)
          // 这个监听不能移除, 不然, 移动一次就移动不了了
          // document.querySelector('#x').removeEventListener('click', preDrag) 
          document.documentElement.removeEventListener('mouseup', stopDrag)
      }

      function startDrag(e) {
          // 开始拖动时要保存当前的宽度和鼠标的当前位置, 为重用提取为一个函数
          width.value = getDivWidth()
          // 保存鼠标当前开始拖动的位置
          startX.value = e.clientX
          // 增加 move 事件
          document.documentElement.addEventListener('mousemove', onDrag)
          document.documentElement.addEventListener('mouseup', stopDrag)
      }

      function onDrag(e) {
          // 鼠标移动的距离 + 原来的宽度 = 新的宽度
          let newWidth = width.value + e.clientX - startX.value
          document.querySelector('#box').style.width = newWidth + 'px'
          dynamicWidth.value = newWidth
      }
      return dynamicWidth
  }

  const useDragHeight = () => {
      const height = ref(0)
      const startY = ref(0)

      const dynamicHeight = ref()

      const getDivHeight = () => parseInt((getComputedStyle(document.querySelector('#box')).height), 10)

      onMounted(() => {
          height.value = getDivHeight()
          dynamicHeight.value = getDivHeight()
          // 监听事件, 鼠标点击事件
          document.querySelector('#y').addEventListener('click', preDrag)

      })
      // 鼠标点击触发准备拖动事件
      function preDrag() {
          // 监听鼠标按下事件
          document.documentElement.addEventListener('mousedown', startDrag)
      }

      function stopDrag() {
          document.documentElement.removeEventListener('mousemove', onDrag)
          document.documentElement.removeEventListener('mousedown', startDrag)
          // 这个监听不能移除, 不然, 移动一次就移动不了了
          // document.querySelector('#x').removeEventListener('click', preDrag)
          document.documentElement.removeEventListener('mouseup', stopDrag)
      }

      function startDrag(e) {
          // 开始拖动时要保存当前的宽度和鼠标的当前位置, 为重用提取为一个函数
          height.value = getDivHeight()
          // 保存鼠标当前开始拖动的位置
          startY.value = e.clientY
          // 增加 move 事件
          document.documentElement.addEventListener('mousemove', onDrag)
          document.documentElement.addEventListener('mouseup', stopDrag)
      }

      function onDrag(e) {
          // 鼠标移动的距离 + 原来的宽度 = 新的宽度
          let newHeight = height.value + e.clientY - startY.value
          document.querySelector('#box').style.height = newHeight + 'px'
          dynamicHeight.value = newHeight
      }
      return dynamicHeight
  }
  
  
  export { useDragWidth, useDragHeight }