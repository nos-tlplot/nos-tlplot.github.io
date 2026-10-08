# NOS-TLPlot

Open-source Python tool for visualising **Newcastle–Ottawa Scale (NOS) risk-of-bias** assessments as publication-ready traffic-light plots and 10+ specialized figures.

🌐 **Web:** [nos-tlplot.github.io](https://nos-tlplot.github.io)

📂 **Zenodo:** [10.5281/zenodo.17065214](https://doi.org/10.5281/zenodo.17065214) 

📃 **Metapaper (JORS):** [10.5334/jors.635](https://doi.org/10.5334/jors.635)


## Quick start

```bash
pip install -r requirements.txt

# Streamlit web app
streamlit run app.py

# Command line
python3 nos_tlplot.py sample.csv output.png
python3 nos_tlplot.py sample.csv output.png gray
```

Upload a CSV/Excel NOS table (see [example/](example)), pick a plot type and theme, and export as `.png`, `.pdf`, `.svg`, or `.eps`.

**Features:** 12 plot types · traffic-light and grayscale themes · CSV/Excel input · 300 DPI vector output.

## Input format

| Column | Range |
| --- | --- |
| `Author, Year` | text |
| Domains 1–4, 7–9 | 0–1 |
| Comparability (Age/Gender, Other) | 0–2 |
| `Total Score` | 0–9 |
| `Overall RoB` | Low / Moderate / High |

Stars → RoB: 

7–9 Low 
4–6 Moderate 
0–3 High.

## Citation

**Sahu, V. (2025).** NOS-TLPlot: Visualization Tool for Newcastle–Ottawa Scale in Meta-Analysis (v2.0.3). Zenodo. [10.5281/zenodo.17065214](https://doi.org/10.5281/zenodo.17065214)

**Sahu, V. (2026).** NOS-TLPlot: A Specialized Python Tool for Visualizing Newcastle–Ottawa Scale Risk-of-Bias Assessments. *Journal of Open Research Software*, 14(1), 7. [10.5334/jors.635](https://doi.org/10.5334/jors.635)

Apache-2.0 


Support: [Issues](https://github.com/aurumz-rgb/NOS-TLPlot/issues) 
