// DOM이 완전히 로드된 후 실행되도록 보장합니다.
document.addEventListener("DOMContentLoaded", function (e) {
  // --- 1. 아이디 변경 관련 로직 ---
  let configId = document.querySelector("#id i"); // 아이디 옆의 아이콘(버튼) 선택
  let idText = document.querySelector("#id span"); // 아이디 텍스트가 표시되는 영역 선택

  configId.addEventListener("click", function (e) {
    // 클릭 시 입력창(prompt)을 띄우고 입력받은 값을 텍스트로 반영합니다.
    idText.textContent = prompt("새로운 아이디를 입력하세요");
  });

  // --- 2. 프로필 상세 정보 편집 관련 로직 ---
  let profileEditButton = document.querySelector("#profile_info_button"); // 편집 버튼
  let userInfo = document.querySelector("#userInfo"); // 사용자 이름/직업 등 영역
  let summary = document.querySelector("#summary"); // 짧은 소개 영역
  let profileDetail = document.querySelector("#profileDetail"); // 상세 링크나 정보 영역

  // 현재 상태가 '수정 중'인지 확인하는 플래그 (false: 일반 상태, true: 수정 중)
  let changing = false;

  profileEditButton.addEventListener("click", function (e) {
    if (changing) {
      // [A] 저장 모드: 입력창(<input>)에 있는 값을 가져와서 다시 텍스트로 되돌립니다.
      let _userInfo = userInfo.querySelector("input").value;
      let _summary = summary.querySelector("input").value;
      let _profileDetail = profileDetail.querySelector("input").value;

      userInfo.innerHTML = _userInfo;
      summary.innerHTML = _summary;

      // 링크(http)가 포함되어 있다면 클릭 가능한 <a> 태그로 감싸줍니다.
      if (_profileDetail.startsWith("http")) {
        _profileDetail =
          "<a href=" + _profileDetail + ">" + _profileDetail + "</a>";
      }

      profileDetail.innerHTML = _profileDetail;

      // 버튼 텍스트 변경 및 상태 전환
      e.target.textContent = "프로필 편집";
      changing = false;
    } else {
      // [B] 편집 모드: 기존 텍스트 내용을 가져와서 <input> 태그 안에 넣어줍니다.
      let _userInfo = userInfo.textContent;
      let _summary = summary.textContent;
      let _profileDetail = profileDetail.textContent;

      // HTML을 동적으로 변경하여 사용자가 직접 입력할 수 있게 만듭니다.
      userInfo.innerHTML = "<input value=" + _userInfo + "></input>:";
      // (참고) 아래 줄에 < 가 누락된 부분이 있어 보입니다. (수정 필요)
      summary.innerHTML = "<input value=" + _summary + "></input>";
      profileDetail.innerHTML = "<input value=" + _profileDetail + "></input>";

      e.target.textContent = "프로필 편집 완료";
      changing = true;
    }
  });
  let profile_pic = document.querySelector("#profile_pic .circle_pic");
  profile_pic.addEventListener("mouseover", function (e) {
    e.target.style.filter = "grayscale(50%)";
  });

  profile_pic.addEventListener("mouseleave", function (e) {
    e.target.style.filter = "grayscale(0%)";
  });

  profile_pic.addEventListener("click", function (e) {
    profile_pic.setAttribute("src", prompt("이미지 url을 입력해주세요"));
  });
});
