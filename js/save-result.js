const API_URL = "https://d5doh57gnofrijterto1.7qsg961h.apigw.yandexcloud.net";

async function saveTestResult({
  testType,
  startedAt,
  result,
  answers
}) {
  const completedAt = new Date().toISOString();

  const payload = {
    test_type: testType,
    started_at: startedAt,
    completed_at: completedAt,
    result: result,
    answers: answers
  };

  try {
    const response = await fetch(`${API_URL}/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.success === false) {
      throw new Error(data.error || "Ошибка API");
    }

    console.log(`Результат ${testType} сохранён:`, data);
    return data;

  } catch (error) {
    console.error(`Ошибка сохранения ${testType}:`, error);
    throw error;
  }
}