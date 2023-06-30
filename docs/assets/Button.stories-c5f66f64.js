import{j as e}from"./jsx-runtime-6eef64cc.js";import{P as a}from"./index-2baff29e.js";import{r as T}from"./index-c013ead5.js";import{I as O}from"./index-a78e9d67.js";import"./_commonjsHelpers-725317a4.js";const $="_button_4uxip_1",z="_orange_4uxip_30",V="_cancel_4uxip_46",i={button:$,"indigo-blue":"_indigo-blue_4uxip_26",orange:z,cancel:V,"icon-only":"_icon-only_4uxip_51"},o=T.memo(({className:j,buttonStyle:q,children:B,...l})=>e.jsx("button",{type:l.type,className:`${i.button} ${i[`${q}`]} ${j}`,...l,children:B}));o.displayName="Button";o.propTypes={children:a.node.isRequired,type:a.oneOf(["button","submit","reset"]),className:a.string,buttonStyle:a.oneOf(["orange","cancel","indigo-blue","icon-only"])};o.defaultProps={type:"button",className:"",buttonStyle:"orange"};o.__docgenInfo={description:"",methods:[],displayName:"Button",props:{type:{defaultValue:{value:"'button'",computed:!1},type:{name:"enum",value:[{value:"'button'",computed:!1},{value:"'submit'",computed:!1},{value:"'reset'",computed:!1}]},required:!1,description:""},className:{defaultValue:{value:"''",computed:!1},type:{name:"string"},required:!1,description:""},buttonStyle:{defaultValue:{value:"'orange'",computed:!1},type:{name:"enum",value:[{value:"'orange'",computed:!1},{value:"'cancel'",computed:!1},{value:"'indigo-blue'",computed:!1},{value:"'icon-only'",computed:!1}]},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""}}};const E="_heading_f7h3y_1",P="_list_f7h3y_5",u={heading:E,list:P,"add-task":"_add-task_f7h3y_9","plus-icon":"_plus-icon_f7h3y_17"},w={title:"ui/Button",component:o,tags:["autodocs"],parameters:{docs:{description:{component:"ボタンコンポーネント"}}},argTypes:{type:{description:"ボタンのタイプ"},disabled:{control:"boolean",type:{summary:"boolean"},description:"ボタンの有効/無効",table:{defaultValue:{summary:!1}}},children:{description:"ボタンのラベル"},buttonStyle:{description:"ボタンのスタイル"},className:{description:"ボタンのクラス名"}},args:{type:"button",disabled:!1}},n={args:{children:"タスクを追加",buttonStyle:"orange"}},s={args:{children:"タスクを追加",disabled:!0}},t={args:{children:"キャンセル",buttonStyle:"cancel"}},r={args:{children:e.jsxs(e.Fragment,{children:[e.jsx(O,{iconName:"plus",color:"orange",size:"medium",className:u["plus-icon"]}),"タスクを追加"]}),buttonStyle:"indigo-blue",className:u["add-task"]}},c={args:{children:e.jsx(O,{iconName:"check",size:"large",color:"orange"}),buttonStyle:"icon-only"}};var d,p,m;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    children: 'タスクを追加',
    buttonStyle: 'orange'
  }
}`,...(m=(p=n.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var g,y,b;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: 'タスクを追加',
    disabled: true
  }
}`,...(b=(y=s.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var f,_,h;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    children: 'キャンセル',
    buttonStyle: 'cancel'
  }
}`,...(h=(_=t.parameters)==null?void 0:_.docs)==null?void 0:h.source}}};var S,N,x;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    children: <>
        <Icon iconName='plus' color='orange' size='medium' className={styles['plus-icon']} />
        タスクを追加
      </>,
    buttonStyle: 'indigo-blue',
    className: styles['add-task']
  }
}`,...(x=(N=r.parameters)==null?void 0:N.docs)==null?void 0:x.source}}};var v,k,I;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: <Icon iconName='check' size='large' color='orange' />,
    buttonStyle: 'icon-only'
  }
}`,...(I=(k=c.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};const G=["Orange","Disable","Cancel","AddTask","IconOnly"];export{r as AddTask,t as Cancel,s as Disable,c as IconOnly,n as Orange,G as __namedExportsOrder,w as default};
//# sourceMappingURL=Button.stories-c5f66f64.js.map
