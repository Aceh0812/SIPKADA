import{u as H,r as t,R as e,H as L,d as Q}from"./app-2f88eaee.js";import{L as U}from"./Account-8ba589b9.js";import{S as p}from"./sweetalert2.all-92a6b231.js";import"./index-d9835c12.js";function te(){const{errors:l,kabupatens:q,kecamatans:B,desas:J,tpses:R,calons:d,saksis:s}=H().props,[N,G]=t.useState(s.tps_id),[b,M]=t.useState(s.kabupaten_id),[v,z]=t.useState(s.kecamatan_id),[f,W]=t.useState(s.desa_id),[h,S]=t.useState(s.tps),[g,_]=t.useState(s.kabupaten_name),[k,y]=t.useState(s.kecamatan_name),[w,x]=t.useState(s.desa_name),[u,C]=t.useState(s.jumlah_dpt),[r,T]=t.useState(""),[m,V]=t.useState(0),[i,K]=t.useState(""),[I,D]=t.useState(null),[o,O]=t.useState(d.map(a=>({calon_id:a.id,votes:""}))),[E,A]=t.useState(!1),P=(a,n)=>{const c=[...o];c[a].votes=n,O(c)};t.useEffect(()=>{const a=o.reduce((n,c)=>n+Number(c.votes||0),0);T(a)},[o]),t.useEffect(()=>{K(Number(r)+Number(m))},[r,m]),t.useEffect(()=>{const a=Number(r)+Number(m);A(a===Number(u))},[r,m,u]);const j=a=>{a.preventDefault();const F={suara_sah:r,suara_tidak_sah:m,total_suara:i,file:I,tps_id:N,kabupaten_id:b,kecamatan_id:v,desa_id:f,jumlah_dpt:u,calonVotes:o};Q.Inertia.post("/account/quickcounts",F,{onSuccess:()=>{p.fire({title:"Success",text:"Quick count data has been saved.",icon:"success",confirmButtonText:"OK"})},onError:()=>{p.fire({title:"Error",text:"There was an error saving the quick count data.",icon:"error",confirmButtonText:"OK"})}})};return e.createElement(e.Fragment,null,e.createElement(L,null,e.createElement("title",null,"Upload C1 - SIPKADA")),e.createElement(U,null,e.createElement("div",{className:"page-content"},e.createElement("div",{className:"row mt-3"},e.createElement("div",{className:"card"},e.createElement("div",{className:"card-body"},e.createElement("form",{onSubmit:j},e.createElement("div",{className:"row"},e.createElement("div",{className:"col-md-6"},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Tps"),e.createElement("input",{type:"text",className:"form-control",value:h,onChange:a=>S(a.target.value),readOnly:!0})),l.tps_id&&e.createElement("div",{className:"alert alert-danger"},l.tps_id)),e.createElement("div",{className:"col-md-6"},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Jumlah Dpt"),e.createElement("input",{type:"text",className:"form-control",value:u,onChange:a=>C(a.target.value),readOnly:!0})),l.jumlah_dpt&&e.createElement("div",{className:"alert alert-danger"},l.jumlah_dpt))),e.createElement("div",{className:"row"},e.createElement("div",{className:"col-md-4"},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Kabupaten"),e.createElement("input",{type:"text",className:"form-control",value:g,onChange:a=>_(a.target.value),readOnly:!0}))),e.createElement("div",{className:"col-md-4"},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Kecamatan"),e.createElement("input",{type:"text",className:"form-control",value:k,onChange:a=>y(a.target.value),readOnly:!0}))),e.createElement("div",{className:"col-md-4"},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Desa /Kelurahan"),e.createElement("input",{type:"text",className:"form-control",value:w,onChange:a=>x(a.target.value),readOnly:!0})))),e.createElement("div",{className:"row mt-3"},e.createElement("div",{className:"col-12 col-lg-12 d-flex"},e.createElement("div",{className:"card radius-10 w-100"},e.createElement("div",{className:"card-header"},e.createElement("div",{className:"d-flex align-items-center"},e.createElement("div",null,e.createElement("h6",{className:"mb-0"},"HASIL HITUNG CEPAT PILKADA 2024")))),e.createElement("div",{className:"card-body table-responsive"},e.createElement("table",{className:"table table-striped"},e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",null,"#"),e.createElement("th",null,"Paslon"),e.createElement("th",null,"Perolehan Suara"))),e.createElement("tbody",null,d.map((a,n)=>e.createElement("tr",{key:n},e.createElement("td",null,n+1),e.createElement("td",null,a.name),e.createElement("td",null,e.createElement("input",{type:"text",className:"form-control",placeholder:"0",value:o[n].votes,onChange:c=>P(n,c.target.value)})))))),e.createElement("hr",null),e.createElement("div",{className:"row"},e.createElement("div",{className:"col-md-3"},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Suara Sah ",e.createElement("span",{className:"text-danger"},"*")),e.createElement("input",{type:"text",className:"form-control",value:r,readOnly:!0})),l.suara_sah&&e.createElement("div",{className:"alert alert-danger"},l.suara_sah)),e.createElement("div",{className:"col-md-3"},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Suara Tidak Sah ",e.createElement("span",{className:"text-danger"},"*")),e.createElement("input",{type:"text",className:"form-control",value:m,onChange:a=>V(a.target.value),placeholder:"Masukkan Suara Tidak Sah"})),l.suara_tidak_sah&&e.createElement("div",{className:"alert alert-danger"},l.suara_tidak_sah)),e.createElement("div",{className:"col-md-3"},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Total Suara"),e.createElement("input",{type:"text",className:"form-control",value:i,readOnly:!0}))),e.createElement("div",{className:"col-md-3"},e.createElement("div",{className:"mb-3"},e.createElement("label",{className:"form-label fw-bold"},"Upload C1 ",e.createElement("span",{className:"text-danger"},"*")),e.createElement("input",{type:"file",className:"form-control",onChange:a=>D(a.target.files[0])})),l.file&&e.createElement("div",{className:"alert alert-danger"},l.file))),e.createElement("div",{className:"mt-3 d-grid gap-2"},e.createElement("button",{type:"submit",className:"btn btn-md btn-warning me-2",disabled:!E},e.createElement("i",{className:"fa fa-save"})," Save"),!E&&e.createElement("div",{className:"alert alert-danger text-center"},"Total suara harus sama dengan jumlah DPT.")))))))))))))}export{te as default};
