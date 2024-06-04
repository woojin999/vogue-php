/*////////////////////////////////////////
    함수명: loginSet
    기능: PHP코드에서 세션변수로 
        셋팅된 값을 화면에 반영한다
  */ /////////////////////////////////////////
// 백엔드 개발자가 전역변수인 아래 변수에 로그인 메시지와 로그인 권한 정보를 할당해준다
// login_msg : 로그인 메시지, login_auth : 권한
let login_msg, login_auth;
function loginSet(msg, auth) {
  // msg-메시지, auto-권한
  // 콘솔창에 전달값을 찍어봄!
  console.log(msg + "/" + auth);

  // 만약 msg가 null / undefined 면 리턴함
  if (!msg) return;

  // 1. 로그인 환영 메시지 출력하기
  $("#loginMsg").text(msg);

  // 2. 로그인 버튼을 로그아웃 버튼으로 변경하기
  // 대상: .sns a:eq(4) span
  $(".sns a")
    .eq(4)
    .find("span")
    .text("로그아웃")
    // 툴팁변경하기 -> a요소로 다시 올라감
    .parent()
    .attr("title", "로그아웃")

    // 3. a요소에 로그아웃 클릭시 로그아웃하기
    .click(function (e) {
      // 기본이동막기
      e.preventDefault();

      // 비동기통신으로 로그아웃 처리 페이지호출!
      // Ajax - $.post() 로 처리!
      // $.post(호출페이지, 전달변수셋팅, 콜백함수)
      $.post(
        // 1. 호출페이지
        "./process/logOut.php",
        // 2. 전달변수셋팅
        {},
        // 3. 콜백함수
        function (res) {
          // res-결과값

          res = res.trim(); //앞뒤공백제거(혹시)

          if (res === "ok") {
            // 메시지
            alert("안전하게 로그아웃 되었습니다!");

            // 첫페이지로 리로드
            location.href = "index.php";
          } ////// if ////////////////
          else {
            // 메시지
            alert("로그아웃시 문제가 발생하였습니다!" + res);
          } ///// else ///////////////
        } /// 콜백함수 ///////
      ); ///////// Ajax - post /////////
    }); ///// click /////////////////////

  // 4. 회원가입 버튼 제거하기
  // 대상: .sns a:eq(5)
  $(".sns a").eq(5).remove();

  // 5. auth 권한 값이 "A"일 경우 또는 "S"일 경우
  //    "관리자" 메뉴 생성하여 추가하기
  // A - Admin / S - Super Admin / M - Member
  if (auth === "A" || auth === "S") {
    $(".sns").append(
      `
    <a href="#" class="fi fi-user-secret" title="관리자" style="color:red">
        <span class="ir"> 관리자 </span>
    </a>                  
    `
    );

    // 관리자 페이지 링크설정
    // $(".sns a")
    //   .last()
    //   .click(() => (location.href = "./admin/"));
  } /////////// if /////////////////
} ////////// loginSet 함수 /////////////////
