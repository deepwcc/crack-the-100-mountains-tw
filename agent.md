# Agent Execution Protocol: The Mountain Guide

## Task 1: Post-Trip Debriefing
- Input: Strava/Garmin .fit file + GPX track.
- Action: Automatically extract pace, heart rate zones, and rest times.
- Output: Markdown summary of the day's performance.

## Task 2: Gear Recommendation Engine
- Input: Weather forecast for target peak + Duration.
- Action: Cross-reference `skill.md` thermal logic to suggest the best sleep system (e.g., "Take EE 30F + Down Booties" if Temp < 0°C).

## Task 3: Supply Optimization
- Input: Days on trail.
- Action: Generate a grocery list based on 2500 kcal/day requirement and UL weight constraints.

## Task 4: Emergency Management
- Logic: Monitor "Estimated vs Actual" time. If lag > 20%, trigger "Alert Readiness" state.
