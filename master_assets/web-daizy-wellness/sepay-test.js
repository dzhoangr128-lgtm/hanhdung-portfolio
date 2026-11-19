const form=document.getElementById('payment-test'),status=document.getElementById('payment-status');
form.addEventListener('submit',async event=>{
 event.preventDefault();const button=form.querySelector('button');button.disabled=true;status.textContent='Đang kiểm tra…';document.getElementById('payment-detail').hidden=true;
 try{
  const response=await fetch('/api/sepay-test',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form))),signal:AbortSignal.timeout(20000)});
  let data;try{data=await response.json();}catch{throw Error('Máy chủ thanh toán thử tạm gián đoạn. Vui lòng thử lại sau.');}if(!response.ok)throw Error(data.error||'Chưa thể kết nối.');
  document.getElementById('test-bank').textContent=data.bank;document.getElementById('test-account').textContent=data.account;
  document.getElementById('test-amount').textContent=new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(data.amount);
  document.getElementById('test-code').textContent=data.code;document.getElementById('payment-detail').hidden=false;
  status.textContent=data.status==='paid_test'?'Đã nhận thông báo thanh toán THỬ từ SePay. Không có tiền thật được ghi nhận.':'Đang chờ giao dịch mô phỏng từ SePay.';
 }catch(error){status.textContent=error.name==='TimeoutError'?'Kết nối chậm. Vui lòng thử lại.':error.message;}finally{button.disabled=false;}
});
