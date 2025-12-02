import re
import sys

# Tên file đầu vào và đầu ra
input_filename = 'model.txt'
output_filename = 'output.txt'

try:
    # Mở file input để đọc
    with open(input_filename, 'r', encoding='utf-8') as infile:
        # Đọc TOÀN BỘ nội dung file vào 1 chuỗi duy nhất
        content = infile.read()
    
    # Sử dụng Regex (re.sub) để tìm và thay thế
    # \s+ nghĩa là "một hoặc nhiều ký tự whitespace"
    # (bao gồm space ' ', tab '\t', và cả dấu xuống dòng '\n')
    cleaned_content = re.sub(r'\s+', '', content)
    
    # Mở file output để ghi nội dung đã làm sạch
    with open(output_filename, 'w', encoding='utf-8') as outfile:
        outfile.write(cleaned_content)
        
    print(f"Hoàn tất! Đã xóa TẤT CẢ space, tab, và dấu xuống dòng.")
    print(f"Dữ liệu đã lưu vào '{output_filename}'.")

except FileNotFoundError:
    print(f"Lỗi: Không tìm thấy file '{input_filename}'.")
    print("Vui lòng tạo file 'input.txt' trong cùng thư mục và thử lại.")
except Exception as e:
    print(f"Đã xảy ra lỗi không mong muốn: {e}")
    