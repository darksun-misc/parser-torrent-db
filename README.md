# Скрипт для парсинга XML-дампа БД RuTracker.org

Сам скрипт и распакованный файл дампа бэкапа БД (берется с https://rutracker.org/forum/viewtopic.php?t=5591249) поместить в один каталог. XML-файл переименовать по маске "backup.yyyymmdd*.xml" (Для тестирования можно использовать представленный тут небольшой файл "backup.20180722_test.xml")

После запуска скрипта sax_parser.py, в зависимости от выбранного пункта меню, в текущем каталоге создается папка с датой бэкапа (например, "./20180722") и в нем файлы в формате CSV, с записями, разбитыми по категориям, в соответствие со справочником forums, либо каталог DB с базами "torrents.db3" и "content.db3".

Справочник форумов "forums.csv" в новой редакции не нужен. Вся информация берется из обрабатываемого файла.

Если нужна выгрузка в обоих вариантах, то конвертацию в CSV лучше выполнять после создания файла "torrents.db" посредством запуска "export_in_CSV.py"

Зафиксировано время обработки дампа размером 18Гб на PC с процессором Intel i5, ОЗУ 16 Gb и HDD Seagate 4Tb:
*    в CSV 22:04 мин.
*    конвертация в 2 файла DB - около часа.
*    из DB в CSV - меньше минуты + сортировка внутри по возрастанию file_id.

### Fork update

Withing this fork I added the ru_to_tpb.js script, which converts output of this glorious tool to the format supported by https://github.com/darksun-misc/piratebay-db-dump (without rutracker-specific categories)
