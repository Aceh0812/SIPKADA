import{u as s,R as e,H as r,L as n}from"./app-2f88eaee.js";import{L as m,h as l}from"./Account-8ba589b9.js";import{S as o}from"./Search-d101963d.js";import{P as d}from"./Pagination-e053ca58.js";import{D as i}from"./Delete-f90ef771.js";import"./index-d9835c12.js";import"./sweetalert2.all-92a6b231.js";function v(){const{calons:t}=s().props;return e.createElement(e.Fragment,null,e.createElement(r,null,e.createElement("title",null,"PASLON - SIPKADA")),e.createElement(m,null,e.createElement("div",{class:"row mt-5"},e.createElement("div",{class:"col-md-9"},e.createElement("div",{class:"row"},e.createElement("div",{class:"col-md-3 col-12 mb-2"},l(["calons.create"])&&e.createElement(n,{href:"/account/calons/create",class:"btn btn-md btn-success border-0 shadow w-100",type:"button"},e.createElement("i",{class:"fa fa-plus-circle me-2"}),"Tambah Paslon")),e.createElement("div",{class:"col-md-9 col-12 mb-2"},e.createElement(o,{URL:"/account/calons"})))),e.createElement("div",{className:"col-md-4"})),e.createElement("div",{className:"row mt-2 mb-4"},e.createElement("div",{className:"col-12"},e.createElement("div",{className:"card  rounded shadow "},e.createElement("div",{className:"card-header"},e.createElement("span",{className:"font-weight-bold"},e.createElement("i",{className:"fa fa-folder"})," Paslon")),e.createElement("div",{className:"card-body"},e.createElement("div",{className:"table-responsive"},e.createElement("table",{className:"table table-bordered table-striped table-hovered"},e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",{scope:"col",style:{width:"5%"}},"No."),e.createElement("th",{scope:"col",style:{width:"15%"}},"Nama Paslon"),e.createElement("th",{scope:"col",style:{width:"15%"}},"No Urut"),e.createElement("th",{scope:"col",style:{width:"15%"}},"Actions"))),e.createElement("tbody",null,t.data.map((a,c)=>e.createElement("tr",{key:c},e.createElement("td",{className:"text-center"},++c+(t.current_page-1)*t.per_page),e.createElement("td",null,a.name),e.createElement("td",null,a.no_urut),e.createElement("td",{className:"text-center"},l(["calons.create"])&&e.createElement(n,{href:`/account/calons/${a.id}/edit`,className:"btn btn-default btn-sm me-2"},e.createElement("i",{className:"fa fa-pencil-alt"})),l(["calons.create"])&&e.createElement(i,{URL:"/account/calons",id:a.id}))))))),e.createElement(d,{links:t.links,align:"end"})))))))}export{v as default};
