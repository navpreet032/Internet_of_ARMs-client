#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#define LED 2
const char* ssid = "NAME";
const char* password = "PASSWORD";

String server = "URL";

unsigned long last_time = 0;
// Timer set to 10 minutes (600000)
//unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timer_delay = 3000;
String json_res;

Servo s1;  int s1_pin = 13;
Servo s2;  int s2_pin = 12;
Servo s3;  int s3_pin = 27;
Servo s4;  int s4_pin = 26 ;

 int s1_current_pos = 0;
  int s2_current_pos = 0;
  int s3_current_pos = 0;
  int s4_current_pos = 0;

  int s1_target_pos = 0;
  int s2_target_pos = 0;
  int s3_target_pos = 0;
  int s4_target_pos = 0;

void setup() {
  Serial.begin(115200); 

  pinMode(LED,OUTPUT);

  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);

  s1.setPeriodHertz(50);    // standard 50 hz servo
  s2.setPeriodHertz(50);
  s3.setPeriodHertz(50);
  s4.setPeriodHertz(50);
  
  s1.attach(s1_pin, 500, 2400); // attaches the servo on pin 13 to the servo object
  s2.attach(s2_pin, 500, 2400);
  s3.attach(s3_pin, 500, 2400);
  s4.attach(s4_pin, 500, 2400);

 

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  delay(500);
  digitalWrite(LED,HIGH);
  delay(500);
  digitalWrite(LED,LOW);
  
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  static bool newDataReceived = false;
  
if ((millis() - last_time) > timer_delay) {
  digitalWrite(LED,LOW);
    if(WiFi.status()== WL_CONNECTED){
     
      
      json_res = GET_Request(server.c_str());

      DynamicJsonDocument doc(624);
      DeserializationError error = deserializeJson(doc, json_res);

      // Check for parsing errors
      if (error) {
      Serial.print("Failed to parse JSON: ");
      Serial.println(error.c_str());
      return;
      }
  

      JsonObject servoAngles = doc[0]["ServoAngles"];

      // Check if 's1' key exists
      if (servoAngles.containsKey("s1")) {
      
      newDataReceived = true;

        s1_target_pos = servoAngles["s1"];
        s2_target_pos = servoAngles["s2"];
        s3_target_pos = servoAngles["s3"];
        s4_target_pos = servoAngles["s4"];
      } else {
      Serial.println("Key 's1' not found in JSON response.");
      }
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    last_time = millis();
  }

   if (newDataReceived) {
    // Gradually move the servos towards the target positions
    for (int i = 0; i <= 100; i++) {
      s1_current_pos = map(i, 0, 100, s1_current_pos, s1_target_pos);
      s2_current_pos = map(i, 0, 100, s2_current_pos, s2_target_pos);
      s3_current_pos = map(i, 0, 100, s3_current_pos, s3_target_pos);
      s4_current_pos = map(i, 0, 100, s4_current_pos, s4_target_pos);
      if(s1_current_pos >= 0 && s1_current_pos <= 90)
      s1.write(s1_current_pos);
      if(s2_current_pos >= 40 && s2_current_pos <= 180)
      s2.write(s2_current_pos);
      if(s3_current_pos >= 20 && s3_current_pos <= 120)
      s3.write(s3_current_pos);
      if(s4_current_pos >= 0 && s4_current_pos <= 180)
      s4.write(s4_current_pos);

      delay(50); // Add a small delay for smooth movement
    }

    newDataReceived = false;
  }
}

String GET_Request(const char* server) {
  HTTPClient http;    
  http.begin(server);
  int httpResponseCode = http.GET();
  
  String payload = "{}"; 
  
  if (httpResponseCode>0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
    digitalWrite(LED,HIGH);
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
    digitalWrite(LED,HIGH);
        delay(500);
    digitalWrite(LED,LOW);
        delay(500);
    digitalWrite(LED,HIGH);
        delay(500);
    digitalWrite(LED,LOW);
    
  }
  http.end();
  
  return payload;
}
