import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import qn, nsdecls

def create_element(name):
    return OxmlElement(name)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._element.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_background(cell, color_hex):
    shading_xml = f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>'
    cell._element.get_or_add_tcPr().append(parse_xml(shading_xml))

def set_table_borders(table, color="D1D5DB", sz="4"):
    tblPr = table._element.xpath('w:tblPr')
    if tblPr:
        borders_xml = f'''
        <w:tblBorders {nsdecls("w")}>
            <w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:left w:val="none"/>
            <w:right w:val="none"/>
            <w:insideH w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:insideV w:val="none"/>
        </w:tblBorders>
        '''
        tblPr[0].append(parse_xml(borders_xml))

def add_section_header(doc, title_text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    
    run = p.add_run(title_text.upper())
    run.font.name = 'Calibri'
    run.font.size = Pt(11.5)
    run.font.bold = True
    run.font.color.rgb = RGBColor(15, 76, 129)  # Deep Academic Navy
    
    # Bottom border line for section header
    pPr = p._p.get_or_add_pPr()
    pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="10" w:space="2" w:color="0F4C81"/></w:pBdr>')
    pPr.append(pBdr)
    return p

def generate_cv():
    doc = Document()
    
    # Page Setup (Standard A4 with 0.65 in margins)
    section = doc.sections[0]
    section.page_width = Inches(8.27)
    section.page_height = Inches(11.69)
    section.top_margin = Inches(0.6)
    section.bottom_margin = Inches(0.6)
    section.left_margin = Inches(0.65)
    section.right_margin = Inches(0.65)
    
    # Default Font
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Calibri'
    font.size = Pt(10)
    font.color.rgb = RGBColor(30, 41, 59) # Slate 800
    
    # ==========================
    # HEADER TABLE (2 COLUMNS: Info & Photo)
    # ==========================
    header_table = doc.add_table(rows=1, cols=2)
    header_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    header_table.autofit = False
    
    col_widths = [Inches(5.3), Inches(1.65)]
    for row in header_table.rows:
        for idx, width in enumerate(col_widths):
            row.cells[idx].width = width
            
    info_cell = header_table.rows[0].cells[0]
    photo_cell = header_table.rows[0].cells[1]
    
    # Set padding
    set_cell_margins(info_cell, top=0, bottom=50, left=0, right=100)
    set_cell_margins(photo_cell, top=0, bottom=50, left=50, right=0)
    photo_cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
    
    # Name & Designation
    p_name = info_cell.paragraphs[0]
    p_name.paragraph_format.space_after = Pt(2)
    p_name.paragraph_format.space_before = Pt(0)
    r_name = p_name.add_run("NURUL AREFIN NABIL")
    r_name.font.name = 'Calibri'
    r_name.font.size = Pt(20)
    r_name.font.bold = True
    r_name.font.color.rgb = RGBColor(15, 76, 129)
    
    p_title = info_cell.add_paragraph()
    p_title.paragraph_format.space_after = Pt(6)
    r_title = p_title.add_run("Lecturer in ICT | Computer Science & Engineering Educator")
    r_title.font.name = 'Calibri'
    r_title.font.size = Pt(11)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(16, 115, 95) # Teal / Academic accent
    
    # Contact Info
    contacts = [
        ("📍 Address: ", "Barmi, Sreepur, Gazipur-1743, Bangladesh"),
        ("📞 Phone: ", "+880 1881-196146"),
        ("✉ Email: ", "nurularefinnabil@gmail.com"),
        ("🌐 Portfolio: ", "www.areefin.me   |   LinkedIn: in/n-arefin-nabil   |   GitHub: arefin-nabil")
    ]
    
    for lbl, val in contacts:
        p_c = info_cell.add_paragraph()
        p_c.paragraph_format.space_after = Pt(1.5)
        p_c.paragraph_format.line_spacing = 1.05
        r_lbl = p_c.add_run(lbl)
        r_lbl.font.bold = True
        r_lbl.font.size = Pt(9)
        r_lbl.font.color.rgb = RGBColor(71, 85, 105)
        r_val = p_c.add_run(val)
        r_val.font.size = Pt(9)
        r_val.font.color.rgb = RGBColor(30, 41, 59)
        
    # Photo insertion
    img_path = "profile.jpg"
    p_photo = photo_cell.paragraphs[0]
    p_photo.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_photo.paragraph_format.space_after = Pt(0)
    if os.path.exists(img_path):
        p_photo.add_run().add_picture(img_path, width=Inches(1.4))
        
    # ==========================
    # 1. CAREER OBJECTIVE
    # ==========================
    add_section_header(doc, "1. Career Objective")
    p_obj = doc.add_paragraph()
    p_obj.paragraph_format.space_after = Pt(4)
    p_obj.paragraph_format.line_spacing = 1.15
    p_obj.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    r_obj = p_obj.add_run(
        "Energetic and technically proficient Computer Science & Engineering graduate with a distinguished academic record "
        "(Double Golden GPA 5.00 in SSC/Dakhil & HSC/Alim) and 2+ years of dedicated teaching experience in ICT and computer science. "
        "Seeking to contribute as an ICT Lecturer / Computer Instructor in a reputed College, Higher Secondary Institution, "
        "or Vocational/Technical Institute. Committed to delivering structured board curriculum lectures (HSC & BTEB), "
        "facilitating hands-on computer lab sessions, and developing students' problem-solving and analytical thinking abilities."
    )
    r_obj.font.size = Pt(9.5)
    
    # ==========================
    # 2. EDUCATIONAL QUALIFICATIONS
    # ==========================
    add_section_header(doc, "2. Educational Qualifications")
    
    edu_table = doc.add_table(rows=4, cols=5)
    edu_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    edu_table.autofit = False
    set_table_borders(edu_table, color="CBD5E1", sz="4")
    
    edu_col_widths = [Inches(1.6), Inches(2.35), Inches(1.3), Inches(0.85), Inches(0.85)]
    for row in edu_table.rows:
        for idx, width in enumerate(edu_col_widths):
            row.cells[idx].width = width
            
    headers = ["Exam / Degree", "Institution / Board", "Major / Group", "Year", "Result"]
    for idx, text in enumerate(headers):
        cell = edu_table.rows[0].cells[idx]
        set_cell_background(cell, "F1F5F9")
        set_cell_margins(cell, top=80, bottom=80, left=80, right=80)
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        if idx in [3, 4]:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(text)
        r.font.bold = True
        r.font.size = Pt(9)
        r.font.color.rgb = RGBColor(15, 76, 129)
        
    edu_data = [
        ("B.Sc in Computer Science & Engineering (CSE)", "Uttara University, Dhaka", "Computer Science", "2026", "CGPA: 3.40\n(Scale 4.00)"),
        ("Alim (Equivalent to HSC)", "Tamirul Millat Kamil Madrasha\n(Madrasah Education Board)", "Science Group", "2021", "GPA: 5.00\n(Scale 5.00)"),
        ("Dakhil (Equivalent to SSC)", "Patka Dakhil Madrasha\n(Madrasah Education Board)", "Science Group", "2019", "GPA: 5.00\n(Upazila 1st)")
    ]
    
    for row_idx, data in enumerate(edu_data, start=1):
        for col_idx, text in enumerate(data):
            cell = edu_table.rows[row_idx].cells[col_idx]
            set_cell_margins(cell, top=70, bottom=70, left=80, right=80)
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.05
            if col_idx in [3, 4]:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(text)
            r.font.size = Pt(8.8)
            if col_idx == 0:
                r.font.bold = True
            if col_idx == 4 and "5.00" in text:
                r.font.bold = True
                
    # ==========================
    # 3. TEACHING & PROFESSIONAL EXPERIENCE
    # ==========================
    add_section_header(doc, "3. Teaching & Professional Experience")
    
    # Experience 1
    p_exp1 = doc.add_paragraph()
    p_exp1.paragraph_format.space_before = Pt(4)
    p_exp1.paragraph_format.space_after = Pt(1)
    r1 = p_exp1.add_run("Specialist ICT & Programming Instructor / Academic Tutor")
    r1.font.bold = True
    r1.font.size = Pt(10)
    r1.font.color.rgb = RGBColor(15, 76, 129)
    p_exp1.add_run("   |   Barmi & Sreepur, Gazipur").font.size = Pt(9)
    r1_date = p_exp1.add_run(" (2+ Years)")
    r1_date.font.italic = True
    r1_date.font.size = Pt(9)
    r1_date.font.color.rgb = RGBColor(100, 116, 139)
    
    exp1_bullets = [
        "Delivered comprehensive coaching on **HSC ICT (National Board Curriculum)** covering Chapter 1 through 6, with primary emphasis on **C Programming (Ch 5)**, **HTML/Web Design (Ch 4)**, and **DBMS/SQL (Ch 6)**.",
        "Conducted hands-on laptop programming lab sessions, enabling students to write, debug, and execute code in Code::Blocks and text editors.",
        "Designed creative question (CQ) worksheets, solved 10+ years of previous board question papers, and guided multiple batches to achieve A+ grades.",
        "Introduced modern AI-assisted learning techniques (ChatGPT, Copilot) to help students grasp abstract logic and data structures easily."
    ]
    for b in exp1_bullets:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.space_after = Pt(1.5)
        bp.paragraph_format.line_spacing = 1.1
        parts = b.split("**")
        for i, part in enumerate(parts):
            r = bp.add_run(part)
            r.font.size = Pt(8.8)
            if i % 2 == 1:
                r.font.bold = True
                
    # Experience 2
    p_exp2 = doc.add_paragraph()
    p_exp2.paragraph_format.space_before = Pt(4)
    p_exp2.paragraph_format.space_after = Pt(1)
    r2 = p_exp2.add_run("Assistant Teacher (ICT, Mathematics & Science)")
    r2.font.bold = True
    r2.font.size = Pt(10)
    r2.font.color.rgb = RGBColor(15, 76, 129)
    p_exp2.add_run("   |   Barmi Al-Madina Pre-Cadet School & Plus Coaching Center").font.size = Pt(9)
    r2_date = p_exp2.add_run(" (2+ Years)")
    r2_date.font.italic = True
    r2_date.font.size = Pt(9)
    r2_date.font.color.rgb = RGBColor(100, 116, 139)
    
    exp2_bullets = [
        "Conducted classroom lectures for Class 6 to 10 on Computer Applications, Information Technology, General Mathematics, and Science.",
        "Supervised school computer labs, trained students in touch-typing, MS Office applications, and safe internet usage.",
        "Managed multimedia smart classrooms, created interactive slide presentations, and evaluated mid-term and annual examination answer scripts.",
        "Maintained proactive communication with parents through bi-weekly progress reports and counseling sessions."
    ]
    for b in exp2_bullets:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.space_after = Pt(1.5)
        bp.paragraph_format.line_spacing = 1.1
        r = bp.add_run(b)
        r.font.size = Pt(8.8)

    # ==========================
    # 4. SUBJECT SPECIALIZATION & CURRICULUM COMPETENCIES
    # ==========================
    add_section_header(doc, "4. Subject Specialization (HSC & Vocational Curriculum)")
    
    spec_items = [
        ("HSC ICT Chapters:", "World & BD Perspective (Ch 1), Communication Systems & Networking (Ch 2), Number Systems & Digital Logic (Ch 3), Web Design & HTML (Ch 4), C Programming Language (Ch 5), Database Management Systems / SQL (Ch 6)."),
        ("Vocational & Practical Labs:", "Computer Fundamentals & Operating Systems, Office Applications (MS Word, Excel, PowerPoint, Access), Hardware Assembly & Maintenance, LAN Cabling & Basic Networking, Software Installation & Troubleshooting."),
        ("Pedagogy & Classroom Skills:", "Multimedia Presentation, Board Question Bank Solution, Personalized Student Mentoring, Continuous Assessment & Exam Preparation.")
    ]
    for title, desc in spec_items:
        p_sp = doc.add_paragraph()
        p_sp.paragraph_format.space_after = Pt(2)
        p_sp.paragraph_format.line_spacing = 1.1
        r_t = p_sp.add_run(f"•  {title} ")
        r_t.font.bold = True
        r_t.font.size = Pt(9)
        r_t.font.color.rgb = RGBColor(15, 76, 129)
        r_d = p_sp.add_run(desc)
        r_d.font.size = Pt(8.8)

    # ==========================
    # 5. TECHNICAL & COMPUTER SKILLS
    # ==========================
    add_section_header(doc, "5. Technical & Engineering Skills")
    
    tech_skills = [
        ("Programming Languages: ", "C, C++, Java, Python, Dart, PHP (Basics)"),
        ("Web & Frontend: ", "HTML5, CSS3, JavaScript, Responsive UI Design"),
        ("Database Management: ", "MySQL, SQLite, Relational Database Modeling & SQL Queries"),
        ("Mobile App Development: ", "Flutter Framework, Android Studio, REST API Integration"),
        ("Software & Tools: ", "MS Office Suite (Word, Excel, PowerPoint), Code::Blocks, VS Code, Git, GitHub")
    ]
    for k, v in tech_skills:
        p_sk = doc.add_paragraph()
        p_sk.paragraph_format.space_after = Pt(2)
        p_sk.paragraph_format.line_spacing = 1.05
        r_k = p_sk.add_run(f"•  {k}")
        r_k.font.bold = True
        r_k.font.size = Pt(9)
        r_v = p_sk.add_run(v)
        r_v.font.size = Pt(8.8)

    # ==========================
    # 6. KEY ACADEMIC & SOFTWARE PROJECTS
    # ==========================
    add_section_header(doc, "6. Key Academic & Software Projects")
    
    # Project 1
    p_pr1 = doc.add_paragraph()
    p_pr1.paragraph_format.space_before = Pt(3)
    p_pr1.paragraph_format.space_after = Pt(1)
    r_p1 = p_pr1.add_run("1. সাপ ও বন্যপ্রাণী - রেসকিউ বিডি (Snake & Wildlife Rescue BD)")
    r_p1.font.bold = True
    r_p1.font.size = Pt(9.5)
    r_p1.font.color.rgb = RGBColor(15, 76, 129)
    r_p1_badge = p_pr1.add_run("   |   Live on Google Play Store")
    r_p1_badge.font.bold = True
    r_p1_badge.font.size = Pt(8.8)
    r_p1_badge.font.color.rgb = RGBColor(16, 115, 95)
    
    p_pr1_desc = doc.add_paragraph()
    p_pr1_desc.paragraph_format.space_after = Pt(2)
    p_pr1_desc.paragraph_format.line_spacing = 1.1
    p_pr1_desc.paragraph_format.left_indent = Inches(0.2)
    r_p1_d = p_pr1_desc.add_run(
        "• Technology Stack: Flutter, Dart, Vercel Web API, Cloud Database.\n"
        "• Description: Developed and published a full-stack mobile application aimed at wildlife conservation and snakebite emergency management. Features real-time rescuer directory search across Bangladesh, emergency call hotlines, and an educational database on venomous species."
    )
    r_p1_d.font.size = Pt(8.8)
    
    # Project 2
    p_pr2 = doc.add_paragraph()
    p_pr2.paragraph_format.space_before = Pt(3)
    p_pr2.paragraph_format.space_after = Pt(1)
    r_p2 = p_pr2.add_run("2. Beetech Supershop Management System")
    r_p2.font.bold = True
    r_p2.font.size = Pt(9.5)
    r_p2.font.color.rgb = RGBColor(15, 76, 129)
    r_p2_sub = p_pr2.add_run("   |   Open Source GitHub Project")
    r_p2_sub.font.size = Pt(8.8)
    r_p2_sub.font.color.rgb = RGBColor(100, 116, 139)
    
    p_pr2_desc = doc.add_paragraph()
    p_pr2_desc.paragraph_format.space_after = Pt(2)
    p_pr2_desc.paragraph_format.line_spacing = 1.1
    p_pr2_desc.paragraph_format.left_indent = Inches(0.2)
    r_p2_d = p_pr2_desc.add_run(
        "• Technology Stack: Object-Oriented Programming, C++/Java, Database Storage.\n"
        "• Description: An inventory and billing software simulating real-world point-of-sale operations, including product cataloging, automated bill calculation, discount vouchers, and daily sales report generation."
    )
    r_p2_d.font.size = Pt(8.8)

    # ==========================
    # 7. ACADEMIC HONORS & ACHIEVEMENTS
    # ==========================
    add_section_header(doc, "7. Academic Honors & Achievements")
    
    achievements = [
        "**Upazila 1st Rank (Dakhil Examination, 2019):** Secured 1st Position in Sreepur Upazila under the Bangladesh Madrasah Education Board with GPA 5.00/5.00.",
        "**General Board Merit Scholarship (2019):** Awarded merit-based scholarship by the Ministry of Education, Bangladesh for outstanding performance in secondary board examination.",
        "**Consistent Golden GPA 5.00 Holder:** Achieved GPA 5.00 in both secondary (Dakhil) and higher secondary (Alim) level examinations in Science Group."
    ]
    for ach in achievements:
        p_ac = doc.add_paragraph(style='List Bullet')
        p_ac.paragraph_format.space_after = Pt(2)
        p_ac.paragraph_format.line_spacing = 1.1
        parts = ach.split("**")
        for i, part in enumerate(parts):
            r = p_ac.add_run(part)
            r.font.size = Pt(8.8)
            if i % 2 == 1:
                r.font.bold = True
                
    # ==========================
    # 8. TRAINING & PROFESSIONAL CERTIFICATIONS
    # ==========================
    add_section_header(doc, "8. Training & Certifications")
    
    trainings = [
        ("Competitive Programming & Problem Solving with C/C++:", "Completed intensive structured algorithms, problem-solving, and data structures curriculum (Phitron)."),
        ("CSE Undergraduate Practical Lab Curricula:", "Completed university coursework and hands-on laboratory certifications in OOP, Database Management Systems, Data Structures & Algorithms, Computer Networks, and Microprocessors (Uttara University).")
    ]
    for t_title, t_desc in trainings:
        p_tr = doc.add_paragraph()
        p_tr.paragraph_format.space_after = Pt(2)
        p_tr.paragraph_format.line_spacing = 1.1
        r_tt = p_tr.add_run(f"•  {t_title} ")
        r_tt.font.bold = True
        r_tt.font.size = Pt(9)
        r_td = p_tr.add_run(t_desc)
        r_td.font.size = Pt(8.8)

    # ==========================
    # 9. PERSONAL DETAILS (Mandatory for BD Job Applications)
    # ==========================
    add_section_header(doc, "9. Personal Information")
    
    personal_table = doc.add_table(rows=5, cols=4)
    personal_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    personal_table.autofit = False
    set_table_borders(personal_table, color="E2E8F0", sz="4")
    
    p_widths = [Inches(1.7), Inches(2.0), Inches(1.5), Inches(1.8)]
    for row in personal_table.rows:
        for idx, width in enumerate(p_widths):
            row.cells[idx].width = width
            
    p_info = [
        [("Father's Name", ": Md. [Father's Name]"), ("Nationality", ": Bangladeshi (By Birth)")],
        [("Mother's Name", ": [Mother's Name]"), ("Religion", ": Islam")],
        [("Date of Birth", ": [DD/MM/YYYY]"), ("Marital Status", ": Single")],
        [("Gender", ": Male"), ("National ID / NID", ": Available on Request")],
        [("Permanent Address", ": Barmi, Sreepur, Gazipur-1743"), ("Present Address", ": Barmi, Sreepur, Gazipur-1743")]
    ]
    
    for row_idx, row_pair in enumerate(p_info):
        # Left pair
        c0 = personal_table.rows[row_idx].cells[0]
        c1 = personal_table.rows[row_idx].cells[1]
        c2 = personal_table.rows[row_idx].cells[2]
        c3 = personal_table.rows[row_idx].cells[3]
        
        for c in [c0, c1, c2, c3]:
            set_cell_margins(c, top=40, bottom=40, left=50, right=50)
            
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(row_pair[0][0])
        r0.font.bold = True
        r0.font.size = Pt(8.5)
        
        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(row_pair[0][1])
        r1.font.size = Pt(8.5)
        
        p2 = c2.paragraphs[0]
        p2.paragraph_format.space_after = Pt(0)
        r2 = p2.add_run(row_pair[1][0])
        r2.font.bold = True
        r2.font.size = Pt(8.5)
        
        p3 = c3.paragraphs[0]
        p3.paragraph_format.space_after = Pt(0)
        r3 = p3.add_run(row_pair[1][1])
        r3.font.size = Pt(8.5)

    # ==========================
    # 10. REFERENCES
    # ==========================
    add_section_header(doc, "10. Academic & Professional References")
    
    ref_table = doc.add_table(rows=1, cols=2)
    ref_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    ref_table.autofit = False
    
    for idx, width in enumerate([Inches(3.5), Inches(3.5)]):
        ref_table.rows[0].cells[idx].width = width
        set_cell_margins(ref_table.rows[0].cells[idx], top=60, bottom=60, left=60, right=60)
        
    c_ref1 = ref_table.rows[0].cells[0]
    p_rf1 = c_ref1.paragraphs[0]
    p_rf1.paragraph_format.space_after = Pt(2)
    p_rf1.paragraph_format.line_spacing = 1.1
    r_rf1_n = p_rf1.add_run("Reference 01 (Academic):\n")
    r_rf1_n.font.bold = True
    r_rf1_n.font.size = Pt(9)
    r_rf1_n.font.color.rgb = RGBColor(15, 76, 129)
    r_rf1_d = p_rf1.add_run(
        "Professor / Associate Professor\n"
        "Department of Computer Science & Engineering\n"
        "Uttara University, Dhaka, Bangladesh\n"
        "Email: [Faculty Email]  |  Phone: [Faculty Phone]"
    )
    r_rf1_d.font.size = Pt(8.5)
    
    c_ref2 = ref_table.rows[0].cells[1]
    p_rf2 = c_ref2.paragraphs[0]
    p_rf2.paragraph_format.space_after = Pt(2)
    p_rf2.paragraph_format.line_spacing = 1.1
    r_rf2_n = p_rf2.add_run("Reference 02 (Professional / Institutional):\n")
    r_rf2_n.font.bold = True
    r_rf2_n.font.size = Pt(9)
    r_rf2_n.font.color.rgb = RGBColor(15, 76, 129)
    r_rf2_d = p_rf2.add_run(
        "Headmaster / Academic Director\n"
        "Barmi Al-Madina Pre-Cadet School\n"
        "Barmi, Sreepur, Gazipur, Bangladesh\n"
        "Email: [School Email]  |  Phone: [School Phone]"
    )
    r_rf2_d.font.size = Pt(8.5)

    # ==========================
    # DECLARATION & SIGNATURE
    # ==========================
    p_dec = doc.add_paragraph()
    p_dec.paragraph_format.space_before = Pt(12)
    p_dec.paragraph_format.space_after = Pt(18)
    p_dec.paragraph_format.line_spacing = 1.15
    r_dec = p_dec.add_run(
        "Declaration: I, Nurul Arefin Nabil, solemnly declare that all the information provided in this curriculum vitae "
        "is authentic, complete, and accurate to the best of my knowledge and belief."
    )
    r_dec.font.italic = True
    r_dec.font.size = Pt(8.5)
    r_dec.font.color.rgb = RGBColor(71, 85, 105)
    
    # Signature line
    p_sig = doc.add_paragraph()
    p_sig.paragraph_format.space_after = Pt(0)
    p_sig.paragraph_format.keep_with_next = True
    r_sig_line = p_sig.add_run("_______________________________\n")
    r_sig_line.font.bold = True
    r_sig_line.font.color.rgb = RGBColor(15, 76, 129)
    r_sig_name = p_sig.add_run("Nurul Arefin Nabil\n")
    r_sig_name.font.bold = True
    r_sig_name.font.size = Pt(9.5)
    r_sig_date = p_sig.add_run("Date: .......................................")
    r_sig_date.font.size = Pt(8.5)
    r_sig_date.font.color.rgb = RGBColor(100, 116, 139)
    
    output_filename = "CV_Nurul_Arefin_Nabil_ICT_Lecturer.docx"
    try:
        doc.save(output_filename)
        print(f"Successfully generated: {output_filename}")
    except PermissionError:
        alt_filename = "CV_Nurul_Arefin_Nabil_ICT_Lecturer_Updated.docx"
        doc.save(alt_filename)
        print(f"Original file is open in Word. Successfully generated updated version: {alt_filename}")

if __name__ == "__main__":
    generate_cv()
