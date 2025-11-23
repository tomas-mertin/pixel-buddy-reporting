"""
Pixel Buddy Test Results Client
Helper pro snadné odesílání výsledků automatizovaných testů
"""

import requests
import base64
from typing import List, Dict, Optional
from pathlib import Path


class PixelBuddyClient:
    """Klient pro odesílání výsledků testů do Pixel Buddy"""
    
    def __init__(self, api_url: str = "https://uzzikuinsxattkvphthm.supabase.co/functions/v1/submit-test-results-with-images"):
        self.api_url = api_url
    
    @staticmethod
    def encode_image(image_path: str) -> str:
        """Zakóduje obrázek do base64"""
        with open(image_path, 'rb') as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
    
    def submit_test_results(
        self,
        application_name: str,
        screenshots: List[Dict],
        application_description: Optional[str] = None,
        metadata: Optional[Dict] = None
    ) -> Dict:
        """
        Odešle výsledky testů
        
        Args:
            application_name: Název aplikace/projektu
            screenshots: Seznam screenshotů s cestami k obrázkům
            application_description: Volitelný popis aplikace
            metadata: Volitelná metadata (branch, commit, atd.)
        
        Screenshots format:
        [
            {
                "screenName": "login",
                "actualImagePath": "path/to/actual.png",
                "baselineImagePath": "path/to/baseline.png",  # volitelné
                "diffImagePath": "path/to/diff.png",  # volitelné
                "differencePercentage": 2.5,  # volitelné
                "status": "passed"  # passed/failed/pending
            }
        ]
        
        Returns:
            Response JSON s testRunId a applicationId
        """
        
        # Zakódovat všechny obrázky
        encoded_screenshots = []
        for screenshot in screenshots:
            encoded_screenshot = {
                "screenName": screenshot["screenName"],
                "actualImage": self.encode_image(screenshot["actualImagePath"]),
                "status": screenshot.get("status", "pending"),
            }
            
            # Přidat volitelné pole
            if "baselineImagePath" in screenshot:
                encoded_screenshot["baselineImage"] = self.encode_image(screenshot["baselineImagePath"])
            
            if "diffImagePath" in screenshot:
                encoded_screenshot["diffImage"] = self.encode_image(screenshot["diffImagePath"])
            
            if "differencePercentage" in screenshot:
                encoded_screenshot["differencePercentage"] = screenshot["differencePercentage"]
            
            encoded_screenshots.append(encoded_screenshot)
        
        # Sestavit payload
        payload = {
            "applicationName": application_name,
            "screenshots": encoded_screenshots,
        }
        
        if application_description:
            payload["applicationDescription"] = application_description
        
        if metadata:
            payload["metadata"] = metadata
        
        # Odeslat request
        response = requests.post(self.api_url, json=payload)
        response.raise_for_status()
        
        return response.json()


# Příklad použití
if __name__ == "__main__":
    client = PixelBuddyClient()
    
    # Příklad 1: Jeden screenshot bez baseline
    result = client.submit_test_results(
        application_name="Test App",
        screenshots=[
            {
                "screenName": "login",
                "actualImagePath": "screenshots/login_actual.png",
                "status": "passed"
            }
        ],
        metadata={
            "branch": "main",
            "commit": "abc123"
        }
    )
    
    print("Test odeslaný:", result)
    
    # Příklad 2: Více screenshotů s baseline a diff
    result = client.submit_test_results(
        application_name="Production App",
        application_description="E-commerce aplikace",
        screenshots=[
            {
                "screenName": "login",
                "actualImagePath": "screenshots/login_actual.png",
                "baselineImagePath": "screenshots/login_baseline.png",
                "diffImagePath": "screenshots/login_diff.png",
                "differencePercentage": 1.2,
                "status": "passed"
            },
            {
                "screenName": "dashboard",
                "actualImagePath": "screenshots/dashboard_actual.png",
                "baselineImagePath": "screenshots/dashboard_baseline.png",
                "diffImagePath": "screenshots/dashboard_diff.png",
                "differencePercentage": 5.8,
                "status": "failed"
            }
        ],
        metadata={
            "branch": "feature/new-ui",
            "commit": "def456",
            "environment": "staging"
        }
    )
    
    print("Test odeslaný:", result)
