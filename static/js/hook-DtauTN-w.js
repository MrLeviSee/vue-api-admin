var g=(i,y,n)=>new Promise((m,d)=>{var R=l=>{try{u(n.next(l))}catch(o){d(o)}},D=l=>{try{u(n.throw(l))}catch(o){d(o)}},u=l=>l.done?m(l.value):Promise.resolve(l.value).then(R,D);u((n=n.apply(i,y)).next())});import{u as O,_ as E}from"./form.vue_vue_type_script_setup_true_lang-DreFWz0_.js";import{t as H,n as x,x as j,a8 as G,b as s,r as h,f as q,aA as c,aL as J,aM as K,af as Q}from"./index-D3FY82Rz.js";import{b as X,D as Y,U as F}from"./ApiManagement-DjAkuJHf.js";import{u as Z}from"./useBasicLayout-DS6NlR9d.js";import{u as w}from"./hooks-BZdzfI4y.js";import{d as ee}from"./edit-pen-Ci7W0xNM.js";import"./index-CsrB2J66.js";const{isMobile:k}=Z(),r=x({});function re(){const i=H({summary:"",enable:void 0,free:void 0,pageSize:10,currentPage:1}),y=x(),n=x([]),m=x(!0),{switchStyle:d}=O(),D=[{label:"序号",type:"index",index:a=>(i.currentPage-1)*i.pageSize+a+1,minWidth:50},{label:"-",prop:"today_call",hide:!0},{label:"-",prop:"total_call",hide:!0},{label:"-",prop:"total_call_limit",hide:!0},{label:"-",prop:"daily_call_limit",hide:!0},{label:"函数名称",prop:"funcName",hide:!0},{label:"API名称",prop:"summary",width:200,align:"left",cellRenderer:({row:a})=>a.summary||a.name?s("span",null,[a.summary||a.name]):""},{label:"状态",minWidth:80,cellRenderer:a=>{var e;return a.row.hasOwnProperty("enable")?s(h("el-switch"),{size:a.props.size==="small"?"small":"default",loading:(e=r.value[a.index])==null?void 0:e.loading,modelValue:a.row.enable,"onUpdate:modelValue":t=>a.row.enable=t,"active-value":!0,"inactive-value":!1,"active-text":"已激活","inactive-text":"已停用","inline-prompt":!0,style:d.value,onChange:()=>u(a,"enable")},null):""}},{label:"路径",prop:"route",minWidth:120,cellRenderer:({row:a})=>a.path?s(h("el-tag"),{type:"primary",effect:"dark"},{default:()=>[a.path]}):""},{label:"请求方式",prop:"methods",minWidth:80,cellRenderer:({row:a})=>a.methods?s(h("el-tag"),{type:a.methods[0]==="GET"?"success":"danger",effect:"dark"},{default:()=>[a.methods]}):""},{label:"是否免费",minWidth:80,cellRenderer:a=>{var e;return a.row.hasOwnProperty("free")?s(h("el-switch"),{size:a.props.size==="small"?"small":"default",loading:(e=r.value[a.index])==null?void 0:e.loading,modelValue:a.row.free,"onUpdate:modelValue":t=>a.row.free=t,"active-value":!0,"inactive-value":!1,"active-text":"免费","inactive-text":"收费","inline-prompt":!0,style:d.value,onChange:()=>u(a,"free")},null):""}},{label:"消耗点数",prop:"points",minWidth:80},{label:"操作",fixed:"right",width:180,slot:"operation",cellRenderer:({row:a})=>a.path?s("div",null,[s(h("el-button"),{class:"reset-margin",link:!0,type:"primary",icon:w(ee),onClick:()=>l("修改",a)},{default:()=>[q("修改")]})]):""}];function u({row:a,index:e},t){const p=a[t]?t==="enable"?"启用":"免费":t==="enable"?"停用":"收费",v=t==="enable"?"启用状态":"收费状态";K.confirm(`确认要<strong>${p}</strong><strong style='color:var(--el-color-primary)'>${a.summary}</strong>这个API吗?`,"系统提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",dangerouslyUseHTMLString:!0,draggable:!0}).then(()=>{r.value[e]=Object.assign({},r.value[e],{loading:!0});const _={[t]:a[t]};F(a.funcName,_).then(f=>{f.code===200?setTimeout(()=>{r.value[e]=Object.assign({},r.value[e],{loading:!1}),c(`已成功将API<strong>${a.summary}</strong>的${v}修改为<strong>${p}</strong>`,{type:"success",dangerouslyUseHTMLString:!0})},200):c(`操作失败，${f.message}`,{type:"error"})})}).catch(()=>{a[t]=!a[t]})}function l(a="编辑",e){var t,p,v,_,f,$,I,M,P,A,N,S;J({title:`${a}API`,props:{formInline:{path:(t=e==null?void 0:e.path)!=null?t:"",funcName:(p=e==null?void 0:e.funcName)!=null?p:"",total_call:(v=e==null?void 0:e.total_call)!=null?v:0,today_call:(_=e==null?void 0:e.today_call)!=null?_:0,summary:(f=e==null?void 0:e.summary)!=null?f:"",methods:($=e==null?void 0:e.methods)!=null?$:[],points:(I=e==null?void 0:e.points)!=null?I:0,category:(M=e==null?void 0:e.category)!=null?M:"",daily_call_limit:(P=e==null?void 0:e.daily_call_limit)!=null?P:0,total_call_limit:(A=e==null?void 0:e.total_call_limit)!=null?A:0,free:(N=e==null?void 0:e.free)!=null?N:!0,enable:(S=e==null?void 0:e.enable)!=null?S:!0}},width:"46%",draggable:!0,fullscreenIcon:!0,fullscreen:!!k.value,closeOnClickModal:!1,contentRenderer:()=>Q(E,{ref:y,formInline:null}),beforeSure:(L,{options:U})=>{const V=y.value.getRef(),C=U.props.formInline;function W(){c(`您${a}了API为${C.funcName}的这条数据`,{type:"success"}),L(),b()}V.validate(B=>{B&&a==="编辑"&&F(e==null?void 0:e.funcName,C).then(T=>g(this,null,function*(){T.code===200?yield W():c(`操作失败，${T.message}`,{type:"error"})}))})}})}function o(a){a&&(a.resetFields(),b())}function z(){return g(this,null,function*(){Y().then(a=>g(this,null,function*(){a.code===200?c("数据同步完成",{type:"success"}):c(`操作失败，${a.message}`,{type:"error"})}))})}function b(){return g(this,null,function*(){m.value=!0;const{data:a}=yield X(G(i));let e=a;n.value=e,setTimeout(()=>{m.value=!1},500)})}return j(()=>{b()}),{form:i,loading:m,openDialog:l,DataSync:z,columns:D,dataList:n,isMobile:k,onSearch:b,resetForm:o}}export{re as useDept};
