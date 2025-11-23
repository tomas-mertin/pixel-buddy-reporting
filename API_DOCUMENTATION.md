# API pro automatizované testy - Dokumentace

## 🎯 Doporučený endpoint - S nahráváním obrázků

**URL:** `https://uzzikuinsxattkvphthm.supabase.co/functions/v1/submit-test-results-with-images`

**Metoda:** `POST`

**Autentizace:** Není potřeba (veřejné API)

### Formát dat

Tento endpoint přijímá obrázky jako base64 zakódované stringy. Obrázky se automaticky nahrají do Cloud Storage.

```json
{
  "applicationName": "Název aplikace",
  "applicationDescription": "Popis aplikace (volitelné)",
  "screenshots": [
    {
      "screenName": "login",
      "actualImage": "iVBORw0KGgoAAAANSUhEUg...",
      "baselineImage": "iVBORw0KGgoAAAANSUhEUg...",
      "diffImage": "iVBORw0KGgoAAAANSUhEUg...",
      "differencePercentage": 2.5,
      "status": "passed"
    }
  ],
  "metadata": {
    "branch": "main",
    "commit": "abc123"
  }
}
```

### Python příklad s nahráváním obrázků

```python
import requests
import base64

# Načtení a zakódování obrázku
def encode_image(image_path):
    with open(image_path, 'rb') as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

url = "https://uzzikuinsxattkvphthm.supabase.co/functions/v1/submit-test-results-with-images"

data = {
    "applicationName": "My App",
    "screenshots": [
        {
            "screenName": "login",
            "actualImage": encode_image("screenshots/login_actual.png"),
            "baselineImage": encode_image("screenshots/login_baseline.png"),
            "diffImage": encode_image("screenshots/login_diff.png"),
            "differencePercentage": 1.5,
            "status": "passed"
        }
    ],
    "metadata": {
        "branch": "main",
        "commit": "abc123"
    }
}

response = requests.post(url, json=data)
print(response.json())
```

---

## Starší endpoint - S externími URL

**⚠️ Tento endpoint vyžaduje, abyste hostovali obrázky externě**

## Endpoint pro příjem výsledků testů

**URL:** `https://uzzikuinsxattkvphthm.supabase.co/functions/v1/submit-test-results`

**Metoda:** `POST`

**Autentizace:** Není potřeba (veřejné API)

## Formát dat

```json
{
  "applicationName": "Název aplikace",
  "applicationDescription": "Popis aplikace (volitelné)",
  "screenshots": [
    {
      "screenName": "login",
      "actualImageUrl": "https://example.com/screenshots/login-actual.png",
      "baselineImageUrl": "https://example.com/screenshots/login-baseline.png",
      "diffImageUrl": "https://example.com/screenshots/login-diff.png",
      "differencePercentage": 2.5,
      "status": "passed"
    }
  ],
  "metadata": {
    "branch": "main",
    "commit": "abc123",
    "environment": "staging"
  }
}
```

### Pole

- **applicationName** (povinné): Název aplikace/projektu
- **applicationDescription** (volitelné): Popis aplikace
- **screenshots** (povinné): Pole screenshotů
  - **screenName** (povinné): Název obrazovky (např. "login", "dashboard")
  - **actualImageUrl** (povinné): URL aktuálního screenshotu
  - **baselineImageUrl** (volitelné): URL baseline screenshotu
  - **diffImageUrl** (volitelné): URL diff screenshotu
  - **differencePercentage** (volitelné): Procento rozdílu (0-100)
  - **status** (povinné): "passed", "failed", nebo "pending"
- **metadata** (volitelné): Další informace (branch, commit, atd.)

## Odpověď

### Úspěch (200)
```json
{
  "success": true,
  "testRunId": "uuid",
  "applicationId": "uuid"
}
```

### Chyba (500)
```json
{
  "error": "Popis chyby"
}
```

## Příklad použití

### cURL
```bash
curl -X POST https://uzzikuinsxattkvphthm.supabase.co/functions/v1/submit-test-results \
  -H "Content-Type: application/json" \
  -d '{
    "applicationName": "My App",
    "screenshots": [
      {
        "screenName": "login",
        "actualImageUrl": "https://example.com/login.png",
        "status": "passed"
      }
    ]
  }'
```

### Python
```python
import requests

url = "https://uzzikuinsxattkvphthm.supabase.co/functions/v1/submit-test-results"

data = {
    "applicationName": "My App",
    "applicationDescription": "Production app",
    "screenshots": [
        {
            "screenName": "login",
            "actualImageUrl": "https://example.com/login-actual.png",
            "baselineImageUrl": "https://example.com/login-baseline.png",
            "diffImageUrl": "https://example.com/login-diff.png",
            "differencePercentage": 1.5,
            "status": "passed"
        }
    ],
    "metadata": {
        "branch": "main",
        "commit": "abc123"
    }
}

response = requests.post(url, json=data)
print(response.json())
```

### JavaScript/TypeScript
```typescript
const url = "https://uzzikuinsxattkvphthm.supabase.co/functions/v1/submit-test-results";

const data = {
  applicationName: "My App",
  screenshots: [
    {
      screenName: "login",
      actualImageUrl: "https://example.com/login.png",
      status: "passed"
    }
  ]
};

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
});

const result = await response.json();
console.log(result);
```

## Databázová struktura

Data jsou ukládána do těchto tabulek:

1. **applications** - Aplikace/projekty
2. **test_runs** - Běhy testů s výsledky
3. **screenshots** - Jednotlivé screenshoty
4. **baselines** - Baseline screenshoty pro porovnání

Všechny tabulky jsou veřejně čitelné (RLS policy umožňuje SELECT všem).
