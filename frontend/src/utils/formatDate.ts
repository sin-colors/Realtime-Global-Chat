function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  // 比較のために「今日の 00:00:00(0時0分0秒)」を作成
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // 比較のために「昨日の 00:00:00(0時0分0秒)」を作成
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
  );
  // 対象のメッセージの「00:00:00(0時0分0秒)」を作成
  const targetDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  // タイムスタンプ（ミリ秒）で比較
  if (targetDay.getTime() === today.getTime()) {
    return "今日";
  } else if (targetDay.getTime() === yesterday.getTime()) {
    return "昨日";
  } else {
    // それ以前の場合は通常通りフォーマット
    const formatter = new Intl.DateTimeFormat("ja-JP", {
      month: "numeric",
      day: "numeric",
      weekday: "short",
    });
    const formattedDate = formatter.format(date);
    return formattedDate;
  }
}
export default formatDate;

// 日付表示は「0時を境に変わるか」が重要なので、new Date(year, month, date) を使って、時間をすべて 00:00:00 に揃えたオブジェクトを作って比較(Date.now() - dateでは24時間以内かどうかしか分からない)
// new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1) と書くと、もし今日が「1月1日」だった場合、JavaScriptが自動的に「前年の12月31日」として計算してくれる
// Dateオブジェクト同士を === で比較することはできないため、.getTime() で数値（ミリ秒）に変換してから比較する
