export class ContenstSafeGuard {
  private static badword() {
    return new RegExp(
      "[시씨씪슈쓔쉬쉽쒸쓉](?:[0-9]*|[0-9]+ *)[바발벌빠빡빨뻘파팔펄]|[섊좆좇졷좄좃좉졽썅춍봊]|[ㅈ조][0-9]*까|ㅅㅣㅂㅏㄹ?|ㅂ[0-9]*ㅅ|[ㅄᄲᇪᄺᄡᄣᄦᇠ]|[ㅅㅆᄴ][0-9]*[ㄲㅅㅆᄴㅂ]|[존좉좇][0-9 ]*나|[자보][0-9]+지|보빨|[봊봋봇봈볻봁봍] *[빨이]|[후훚훐훛훋훗훘훟훝훑][장앙]|[엠앰]창|애[미비]|애자|[가-탏탑-힣]색기|(?:[샊샛세쉐쉑쉨쉒객갞갟갯갰갴겍겎겏겤곅곆곇곗곘곜걕걖걗걧걨걬] *[끼키퀴])|새 *[키퀴]|[병븅][0-9]*[신딱딲]|미친[가-닣닥-힣]|[믿밑]힌|[염옘][0-9]*병|[샊샛샜샠섹섺셋셌셐셱솃솄솈섁섂섓섔섘]기|[섹섺섻쎅쎆쎇쎽쎾쎿섁섂섃썍썎썏][스쓰]|[지야][0-9]*랄|니[애에]미|갈[0-9]*보[^가-힣]|[뻐뻑뻒뻙뻨][0-9]*[뀨큐킹낑)|꼬[0-9]*추|곧[0-9]*휴|[가-힣]슬아치|자[0-9]*박꼼|빨통|[사싸](?:이코|가지|[0-9]*까시)|육[0-9]*시[랄럴]|육[0-9]*실[알얼할헐]|즐[^가-힣]|찌[0-9]*(?:질이|랭이)|찐[0-9]*따|찐[0-9]*찌버거|창[녀놈]|[가-힣]{2,}충[^가-힣]|[가-힣]{2,}츙|부녀자|화냥년|환[양향]년|호[0-9]*[구모]|조[선센][징]|조센|[쪼쪽쪾](?:[발빨]이|[바빠]리)|盧|무현|찌끄[레래]기|(?:하악){2,}|하[앍앜]|[낭당랑앙항남담람암함][ ]?[가-힣]+[띠찌]|느[금급]마|文在|在寅|(?<=[^\n])[家哥]|속냐|[tT]l[qQ]kf|Wls|[ㅂ]신|[ㅅ]발|[ㅈ]밥",
      "g"
    );
  }

  //   xxs
  private static script() {
    return new RegExp(
      "(<script.*?>.*?</script>)|" +
        '((javascript:|data:text/html|vbscript:|livescript:)[^"]*)|' +
        "<.*?on\\w+\\s*=|" +
        "\\b(alert|confirm|prompt|eval|setTimeout|setInterval|Function|document\\.cookie)\\s*\\(|" +
        "<\\s*iframe|<\\s*object|<\\s*embed|<\\s*svg\\s+onload|" +
        "url\\s*\\(\\s*[\"']?javascript:|" +
        "expression\\s*\\(.*?\\)|" +
        "<\\s*img[^>]*src\\s*=\\s*[\"']?data:|" +
        "<[^>]*\\s+style\\s*=\\s*[\"']?[^\"']*\\bexpression\\s*\\(",
      "gi"
    );
  }

  // HTML 태그 감지 (추가)
  private static htmlTags() {
    return new RegExp(
      "</?(?:a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h[1-6]|head|header|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|main|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|svg|table|tbody|td|template|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr)(?:\\s+[^>]*)?(?:>|$)",
      "gi"
    );
  }

  // SQL Injection
  private static sqlInjection() {
    return new RegExp(
      "(?:--\\s*|#|/\\*\\*/)(?:union|select|from|where|having|group|order|insert|update|delete|drop|alter|create|rename|truncate|replace|exec|execute|union|declare|cast)\\b|(?:\\b(?:and|or|not)\\b\\s+(?:\\w+\\s*[=<>]|\\d+\\s*[=<>]))|(?:['\"]\\s*(?:--|#|\\/\\*|;))",
      "gi"
    );
  }

  // 비속어 검사
  static hasBadText(text: string): boolean {
    if (!text) return false;
    return this.badword().test(text);
  }

  // 스크립트 태그 검사 (XSS 방지)
  static hasScriptInText(text: string): boolean {
    if (!text) return false;
    return this.script().test(text);
  }

  // HTML 태그 검사
  static hasHtmlTags(text: string): boolean {
    if (!text) return false;
    return this.htmlTags().test(text);
  }

  // SQL 인젝션 패턴 검사
  static hasSqlInjection(text: string): boolean {
    if (!text) return false;
    return this.sqlInjection().test(text);
  }

  // All in one
  static hasAnyMaliciousContent(text: string): boolean {
    if (!text) return false;
    return (
      this.hasBadText(text) ||
      this.hasScriptInText(text) ||
      this.hasHtmlTags(text) ||
      this.hasSqlInjection(text)
    );
  }
}
