
import { typeDefs } from '../graphql'
import util from 'util' // node 打印完整 object

console.log(util.inspect(typeDefs,{ showHidden: false, depth: null}))
//! 目标, 利用 导入的 typeDefs 生成下面的查询字符串,
//! 获取 typeDefs 上的 Query和Mutation字段, 只有这2个字段与路由相关
//! 返回的应该是一个对象数组
//! [{
//!     operation: 'query', // 是什么操作
//!     path: 'chat', // 路由和函数都要使用的名称
//!     arguements: [], // 函数的参数
//!     type: [] // 返回值的类型, 要追溯到具体的类型, 返回值是对象, 要有层级结构
//! }]
/* 
! 1. 第1步要找到 query或者 mutation
!    data[i].name 存在, 并且 data[i].value 包含在 picks = ['Query', 'Mutation']
!    就认为是根操作符
!    operation: data[i].name.value
!    path: // 第1个字段  
!    argument: []
!    type    
 */

 

/*
{
    kind: 'Document',
    definitions: [
        {
            name: { value: 'Chat'},
            fields: [{
                    name: {value: 'text' },
                    type: { name: {  value: 'String',}}
                },
                {
                    name: {value: 'info'},
                    type: {
                        type: {name: {value: 'Info'}}
                    }
                }
            ]
        },
        {
            name: { value: 'Info'},
            fields: [{
                name: { value: 'email'},
                type: {
                    name: {value: 'String'}
                },
            }],
        },
        {
            name: { value: 'Query'},
            fields: [{
                name: {
                    value: 'getInfo',
                },
                arguments: [{
                    name: {
                        kind: 'Name',
                        value: 'Info',
                    },
                    type: {
                        name: {
                            value: 'Info',
                        },
                    },
                }],
                type: {
                    name: {
                        value: 'Chat',
                    },
                },
            }],
        },
        
    ]
}

*/