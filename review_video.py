import av, os
from PIL import Image, ImageDraw
p = os.path.dirname(__file__)
c = av.open(os.path.join(p, '1024.mp4'))
print('duration', c.duration/1e6, flush=True)
for s in c.streams:
    print(s.type, s.codec_context.name, s.duration, s.time_base, flush=True)
os.makedirs(os.path.join(p,'review_frames'),exist_ok=True)
v = c.streams.video[0]
dur = c.duration/1e6
for batch in range(int(dur//60)+1):
    times=list(range(batch*60,min((batch+1)*60,int(dur)+1),4))
    if not times: continue
    sheet=Image.new('RGB',(1200, ((len(times)+3)//4)*195),'#222222')
    d=ImageDraw.Draw(sheet)
    for j,t in enumerate(times):
        c.seek(int(t*1e6))
        for frame in c.decode(v):
            if frame.time>=t: break
        im=frame.to_image(); im.thumbnail((300,170))
        x=(j%4)*300; y=(j//4)*195
        sheet.paste(im,(x,y)); d.text((x+5,y+171),f'{t//60:02}:{t%60:02}',fill='white')
    sheet.save(os.path.join(p,'review_frames',f'new{batch}.jpg'))
