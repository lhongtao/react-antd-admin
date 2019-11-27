import request from '@/utils/request'

// 提交留言
export function createMessage(data) {
  return request({
    url: '/message/create',
    method: 'post',
    data
  })
}

// 获得留言
export function getMessageBoard() {
  return request({
    url: '/message/list',
    method: 'get',
  })
}

