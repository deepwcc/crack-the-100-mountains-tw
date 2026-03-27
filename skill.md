# Hiking Domain Skills & Logic

## 1. Physical Performance Analysis
- **Z2 Optimization**: Define $Z2 = [135, 145]$ bpm. If Avg HR > 150, flag as "High Stress/Over-pacing".
- **Efficiency Index**: $E = \frac{\Delta Elevation}{\text{Time} \times \text{Avg HR}}$. Higher is better.

## 2. Gear Load-out Logic
- **Base Weight (BW)**: Total weight excluding consumables. Goal: < 6kg for UL.
- **Total Pack Weight (TPW)**: BW + Food + Water. 
- **Thermal Management**: Calculate Clo-value based on layering (e.g., Alpha Direct + EE 30F + Bivy).

## 3. Route Evaluation (GPX Logic)
- **Slope Grade**: Identify sections > 30% as "Steep/High Torque".
- **Rest Interval**: Calculate recovery rate during stops. 

## 4. Supply & Hydration
- **Water Flow Rate**: Track BeFree filter speed (ml/min) to monitor clogging status.
- **Caloric Density**: Goal > 4.5 kcal/g for all trail food.
