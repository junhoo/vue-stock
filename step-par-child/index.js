import { page as layout } from '@/view/layouts';

export default {
  name: 'review_mailreview',
  path: '/workplace/review/mailreview',
  component: layout,
  redirect: '/workplace/review/mail_review/list/selmodule',
  meta: {
    label: '邮箱索评',
    nosub: true
  },
  children: [
    {
      name: 'review_mailreview_list',
      path: '/workplace/review/mail_review/list',
      component: () => import('./List'),
      meta: {
        label: '邮箱索评',
        nosub: true
      },
      children: [
        {
          name: 'mail_review_selmodule',
          path: '/workplace/review/mail_review/list/selmodule',
          component: () => import('./component/SelModule.vue'),
          meta: {
            label: '选择模板'
          }
        },
        {
          name: 'mail_review_edit_content',
          path: '/workplace/review/mail_review/list/editcontent',
          component: () => import('./component/EditContent.vue'),
          meta: {
            label: '编辑内容'
          }
        },
        {
          name: 'mail_review_sendtime',
          path: '/workplace/review/mail_review/list/sendtime',
          component: () => import('./component/SendTime.vue'),
          meta: {
            label: '发送时光'
          }
        },
        {
          name: 'mail_review_selproduct',
          path: '/workplace/review/mail_review/list/selproduct',
          component: () => import('./component/SelProduct.vue'),
          meta: {
            label: '选择商品'
          }
        },
        {
          name: 'mail_review_otherterm',
          path: '/workplace/review/mail_review/list/otherterm',
          component: () => import('./component/OtherTerm.vue'),
          meta: {
            label: '其他条件'
          }
        },
        {
          name: 'mail_review_saveplan',
          path: '/workplace/review/mail_review/list/saveplan',
          component: () => import('./component/SavePlan.vue'),
          meta: {
            label: '保存计划'
          }
        }
      ]
    }
  ]
};
