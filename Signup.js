function Signup() {
  const [id ,setId ] = useState('')
  const [password , setPassword] = useState('')
  const [email , setEmail] = useState('')
  const [phonNumber , setPhonNumber] = useState('')
  const isEmpty = e => {
    if(!e) {
      return true
    }
    else {
      return false
    }
  }
  const isEmail = e => {
    const check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return check.test(e)
  }
  const isPassword = e => {
    const checkPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,13}$/;                       
    return checkPassword.test(e)
  }
  
  const isLength = e => {
    if(e.length < 11) return true
    return false
  }
  
  const idHandel = (e) => {
    setId(e.target.value)
    console.log(e.target.value)
  }
  //  console.log('idididi',id)
  const passwordHandle = (e) => {
   
    setPassword(e.target.value)
    console.log(e.target.value)
  }
  const emailHandel = (e) => {
    setEmail(e.target.value)
    console.log('email',e.target.value) 
  }
  
  const phonNumberHandle = (e) => {
    setPhonNumber(e.target.value)
    console.log(e.target.value)
  }
  
  
  //console.log(typeof checkPassword)
  const onSubmitHandle = (e) => {
    e.preventDefault()
    if(isEmpty(id) || isEmpty(password) || isEmpty(email) || isEmpty(phonNumber)) {
    return console.log('모든 항목을 채워주세요')
    }
    else if (!isPassword(password)) {
      return console.log('패스워드 에러')
    }
    else if(!isEmail(email)) {
    return console.log('이메일 형식 에러')
    }
    else if(isLength(phonNumber)) {
    return console.log('전화번호 에러')
    }
   
   console.log('회원가입성공')
  }
    console.log('????????',id, password , email , phonNumber)
  
    //비번 - 8 ~ 13 영문 대소문자 포함, 특수문자 포함
    //전화번호 -  11자리 문자 x
    // 회원가입 - 버튼 눌렀을때 모든 항목 다 채워
    // 콘솔에 출력 시키기.
    
    return (
      <form onSubmit={onSubmitHandle}>
        <input type="text" placeholder='아이디' type='text' value={id} onChange={idHandel} />
        <input type="text" placeholder='비번' type= 'password' value={password} onChange={passwordHandle} />
        <input type="text" placeholder='이메일' type= 'text' value={email} onChange={emailHandel} />
        <input type="text" placeholder='전화번호' type='number' value={phonNumber} onChange={phonNumberHandle}/>
        <button >회원가입</button>
      </form>
    );
  }
  
  export default Signup;
  