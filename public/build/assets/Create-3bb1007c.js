import{u as h,r as t,R as e,H as S,d as g}from"./app-2f88eaee.js";import{L as w}from"./Account-8ba589b9.js";import{S as T}from"./sweetalert2.all-92a6b231.js";import{S as s}from"./react-select.esm-64768b31.js";import"./index-d9835c12.js";function _(){const{errors:l,kabupatens:d,kecamatans:u,desas:i}=h().props,[m,b]=t.useState(""),[n,E]=t.useState(null),[c,p]=t.useState(null),[r,f]=t.useState(null),[o,v]=t.useState(""),N=async a=>{a.preventDefault(),g.Inertia.post("/account/tpses",{tps:m,jumlah_dpt:o,kabupaten_id:n.value,kecamatan_id:c.value,desa_id:r.value},{onSuccess:()=>{T.fire({title:"Success!",text:"Data saved successfully!",icon:"success",showConfirmButton:!1,timer:1500})}})};return e.createElement(e.Fragment,null,e.createElement(S,null,e.createElement("title",null,"TAMBAH TPS - SIPKADA")),e.createElement(w,null,e.createElement("div",{className:"row mt-4"},e.createElement("div",{className:"col-12"},e.createElement("div",{className:"card border-0 rounded shadow-sm border-top-success"},e.createElement("div",{className:"card-header"},e.createElement("span",{className:"font-weight-bold"},e.createElement("i",{className:"fa fa-folder"})," Tambah TPS")),e.createElement("div",{className:"card-body"},e.createElement("form",{onSubmit:N},e.createElement("div",{className:"row"},e.createElement("div",{className:"col-md-6"},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Nama TPS"),e.createElement("input",{type:"text",className:"form-control",value:m,onChange:a=>b(a.target.value),placeholder:"Tambah Nama TPS"})),l.name&&e.createElement("div",{className:"alert alert-danger"},l.name)),e.createElement("div",{className:"col-md-6"},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Jumlah DPT"),e.createElement("input",{type:"text",className:"form-control",value:o,onChange:a=>v(a.target.value),placeholder:"Tambah Jumlah DPT"})),l.name&&e.createElement("div",{className:"alert alert-danger"},l.name))),e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Kabupaten"),e.createElement(s,{options:d,value:n,onChange:a=>E(a)})),e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Kecamatan"),e.createElement(s,{options:u,value:c,onChange:a=>p(a)})),e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Desa /Kelurahan"),e.createElement(s,{options:i,value:r,onChange:a=>f(a)})),e.createElement("div",null,e.createElement("button",{type:"submit",className:"btn btn-md btn-success me-2"},e.createElement("i",{className:"fa fa-save"})," Save")))))))))}export{_ as default};
